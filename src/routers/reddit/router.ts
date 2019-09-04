require("dotenv").config();
import express from "express";
import _ from "lodash";
import path from "path";
import {
  snoowrapConfig,
  snoowrapConfigLongDelay
} from "@src/config/reddit/config";
// Methods
import retrieveAccessToken from "./auth/methods/retrieveAccessToken";
import getAuth from "@src/db/couchdb/auth/getAuth";
import updateAuth from "@src/db/couchdb/auth/updateAuth";
import createAuth from "@src/db/couchdb/auth/createAuth";
import nano from "@src/db/couchdb/connect";
import getCommentById from "@src/api/reddit/v1/getCommentById";
import getCommentByIdExpanded from "@src/api/reddit/v1/getCommentByIdExpanded";
import permalinkToId from "@src/api/reddit/helpers/permalinkToId";
import getSubmissionById from "@src/api/reddit/v1/getSubmissionById";
import addRedditPost from "@src/db/couchdb/methods/reddit/addRedditPost";
import refreshToken from "./auth/methods/refreshToken";

let redditRouter = express.Router();

/**
 * REDDIT
 */
const REDIRECT_URL = `${process.env.BASEURL}/reddit`;

// http://[address]/reddit
redditRouter.get("/", async (req, res) => {
  // const details = await getAuth(req.session.sessionID);
  const db = nano.use(req.session.sessionID);
  const view = await db.view("post_view", "all", {
    include_docs: true
  });
  if (req.session.authenticated) {
    res.render(path.join(__dirname, "../../views/reddit/"), {
      authenticated: req.session.authenticated,
      sessionID: req.session.sessionID,
      state: req.session.state,
      view: view
    });
  } else {
    console.log("User is not authenticated");
    res.redirect(process.env.BASEURL);
  }
});

/**
 * Go to this route after successfully authenticating via Reddit OAuth flow.
 */
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
      // else if user does not exist, create a new user within db and add new tokens.
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
  const data = await getCommentById(id, snoowrapConfig);
  res.json(data);
});

// ...:upvotes/* is optional
redditRouter.get("/getPost/expanded/:id/", async (req, res) => {
  const id = req.params.id;
  const data = await getCommentByIdExpanded(id, -100, snoowrapConfig);
  res.json(data);
});

redditRouter.get("/getPost/expanded/:id/ups/:ups", async (req, res) => {
  const id = req.params.id;
  const upvotes: number = req.params.ups;
  const data = await getCommentByIdExpanded(id, upvotes, snoowrapConfig);
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
  const lastPage = req.header("Referer") || "/"; // Good practice to redirect to last page used after post

  const data = req.body.data;
  const id = permalinkToId(data);

  if (id.submissionId) {
    const post = await getSubmissionById(id.submissionId, snoowrapConfig);
    const addedPost = await addRedditPost(req.session.sessionID, post);
    console.log(addedPost);
  }

  res.redirect(lastPage);
});

// http://[address]/reddit/refresh
redditRouter.post("/refresh", async (req, res) => {
  const lastPage = req.header("Referer") || "/"; // Good practice to redirect to last page used after post
  const userID = req.session.sessionID;
  try {
    const authDetails = await getAuth(userID);
    const rToken = await refreshToken(authDetails["refresh_token"]);
    const updateToken = await updateAuth(userID, {
      //updateAuth also revokes previous tokens
      access_token: authDetails["access_token"],
      refresh_token: authDetails["refresh_token"]
    });
    res.redirect(lastPage); // Redirect to the last page
  } catch (error) {
    res.redirect(lastPage);
  }
});

export default redditRouter;
