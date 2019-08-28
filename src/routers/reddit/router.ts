require("dotenv").config();
import express from "express";
import _ from "lodash";
import retrieveAccessToken from "./auth/retrieveAccessToken";
import path from "path";
import refreshToken from "./auth/refreshToken";
import getCommentById from "../../api/reddit/v1/getCommentById";
import getCommentByIdExpanded from "../../api/reddit/v1/getCommentByIdExpanded";
import nano from "../../db/couchdb/connect";
import getAuth from "../../db/couchdb/auth/getAuth";
import createAuth from "../../db/couchdb/auth/createAuth";
let redditRouter = express.Router();

/**
 * REDDIT
 */
const REDIRECT_URL = `${process.env.BASEURL}/reddit`;

redditRouter.get("/success", async (req, res) => {
  if (_.isEmpty(req.query)) {
    console.log("fuck");
    res.redirect(REDIRECT_URL);
    return;
  }

  const code = req.query.code;
  const state = req.query.state;
  try {
    /**
     * Store credentials in DB securely and redirect to authenticated route.
     * FIGURE OUT authentication
     */
    const details = await retrieveAccessToken(code);
    const createdAuth = await createAuth(req.session.sessionID, details);
    console.log("created auth", createdAuth);
    details.setId(req.session.sessionID);
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
  const db = nano.use("uniqueuser");
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

redditRouter.post("/addPost/submission/", async req => {
  // Use javascript instead of forms
  req.body;
  const id = req.body;
  // console.log(id);
  // const post = await getSubmissionById(id);
  // const data = await addPost(req.session.sessionID, post);
  // console.log(data);
});

// http://[address]/reddit/destroy
redditRouter.get("/destroy", () => {
  // Destroy session id in database
});

// http://[address]/reddit/refresh
redditRouter.post("/refresh", async (req, res) => {
  try {
    const authDetails = await getAuth(req.session.sessionID);
    const rToken = await refreshToken(authDetails["refresh_token"]);
    console.log(rToken);
  } catch (error) {
    console.log(error);
    res.redirect(REDIRECT_URL);
  }
});

export default redditRouter;
