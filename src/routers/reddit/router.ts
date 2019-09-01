require("dotenv").config();
import express from "express";
import _ from "lodash";
import retrieveAccessToken from "./auth/methods/retrieveAccessToken";
import path from "path";
import refreshToken from "./auth/methods/refreshToken";
import getCommentById from "../../api/reddit/v1/getCommentById";
import getCommentByIdExpanded from "../../api/reddit/v1/getCommentByIdExpanded";
import nano from "../../db/couchdb/connect";
import getAuth from "../../db/couchdb/auth/getAuth";
import createAuth from "../../db/couchdb/auth/createAuth";
import updateAuth from "../../db/couchdb/auth/updateAuth";
import permalinkToId from "../../api/reddit/helpers/permalinkToId";
import getSubmissionById from "../../api/reddit/v1/getSubmissionById";
import addRedditPost from "../../db/couchdb/methods/reddit/addRedditPost";
let redditRouter = express.Router();

/**
 * REDDIT
 */
const REDIRECT_URL = `${process.env.BASEURL}/reddit`;

redditRouter.get("/success", async (req, res) => {
  if (_.isEmpty(req.query)) {
    res.redirect(REDIRECT_URL);
    return;
  }
  if (req.query.state !== req.session.state) {
    console.log(req.query.code, req.session.state);
    res.send("State not matching");
  }

  const code = req.query.code;
  const state = req.query.state;
  try {
    /**
     * Store credentials in DB securely and redirect to authenticated route.
     * userID is also the sessionID and dbName. They are all the same.
     */
    const userID = req.session.sessionID;

    const auth = await getAuth(userID);
    console.log(auth);
    // If user exists, just update tokens and revoke the previous tokens
    if (auth) {
      console.log("Update user:", userID);
      const details = await retrieveAccessToken(code, userID);
      const updatedUser = await updateAuth(userID, {
        access_token: details.access_token,
        refresh_token: details.refresh_token
      });
      console.log(updatedUser);
      // else if user does not exist, create a new user with db and add new tokens.
    } else {
      console.log("Create new user: ", userID);
      const details = await retrieveAccessToken(code, userID);
      details.setId(userID);
      const createdAuth = await createAuth(userID, details);
      console.log(createdAuth);
    }

    req.session.authenticated = true;
    req.session.state = state;
    // Redirect to authenticated route.
    await res.redirect(REDIRECT_URL);
  } catch (error) {
    console.log(error);
  }
});

// http://[address]/reddit
redditRouter.get("/", async (req, res) => {
  const details = await getAuth(req.session.sessionID);
  if (req.session.authenticated) {
    res.render(path.join(__dirname, "../../views/reddit/"), {
      authenticated: req.session.authenticated,
      sessionID: req.session.sessionID,
      state: req.session.state
    });
  } else {
    console.log("User is not authenticated");
    res.redirect(process.env.BASEURL);
  }
});

redditRouter.get("/views/all", async (req, res) => {
  // const id = req.params.id;
  const db = nano.use(req.session.sessionID);
  const data = await db.view("post_view", "all", {
    include_docs: true
  });
  console.log(data);
  res.json(data);
});

redditRouter.get("/getPost/:id/", async (req, res) => {
  const id = req.params.id;
  const data = await getCommentById(id);
  res.json(data);
});

// ...:upvotes/* is optional
redditRouter.get("/getPost/expanded/:id/", async (req, res) => {
  const id = req.params.id;
  const data = await getCommentByIdExpanded(id, -100);
  res.json(data);
});

redditRouter.get("/getPost/expanded/:id/ups/:ups", async (req, res) => {
  const id = req.params.id;
  const upvotes: number = req.params.ups;
  const data = await getCommentByIdExpanded(id, upvotes);
  res.json(data);
});

/**
 * Revoke/Destroy access token
 */
// http://[address]/reddit/destroy
redditRouter.get("/destroy", () => {
  // Destroy session id in database
});

redditRouter.post("/addRedditPost/submission/", async (req, res) => {
  const currentPage = req.header("Referer") || "/"; // Good practice to redirect to last page used after post

  const data = req.body.data;
  const id = permalinkToId(data);
  if (id.submissionId) {
    const post = await getSubmissionById(id.submissionId);
    const addedPost = await addRedditPost(req.session.sessionID, post);
    console.log(addedPost);
  }

  // const data = await addRedditPost(req.session.sessionID, post);
  // console.log(data);
  res.redirect(currentPage);
});

// http://[address]/reddit/refresh
redditRouter.post("/refresh", async (req, res) => {
  const currentPage = req.header("Referer") || "/"; // Good practice to redirect to last page used after post
  const userID = req.session.sessionID;
  try {
    const authDetails = await getAuth(userID);
    const rToken = await refreshToken(authDetails["refresh_token"]);
    const updateToken = await updateAuth(userID, {
      access_token: authDetails["access_token"],
      refresh_token: authDetails["refresh_token"]
    });
    // console.log(updateToken);
    res.redirect(currentPage);
  } catch (error) {
    // console.log(error);
    // console.log(currentPage);
    res.redirect(currentPage);
  }
});

export default redditRouter;
