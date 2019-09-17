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
import getSubmissionById from "@src/api/reddit/v1/getSubmissionById";
import addRedditPost from "@src/db/couchdb/methods/reddit/addRedditPost";
import refreshToken from "./auth/methods/refreshToken";
import { logger } from "@src/winston";
import winston from "winston";

let redditRouter = express.Router();

/**
 * REDDIT
 */
const REDIRECT_URL = `${process.env.BASEURL}/reddit`;

// http://[address]/reddit
redditRouter.get("/", async (req, res) => {
  if (process.env.MODE === "Development") {
    req.session.authenticated = true;
    req.session.sessionID = "gre-uniqueid";
  }

  if (req.session.authenticated) {
    try {
      const db = nano.use(req.session.sessionID);
      const view = await db.view("post_view", "all", {
        include_docs: true
      });
    } catch (error) {
      logger.info({
        ip: req.header("x-forwarded-for") || req.connection.remoteAddress,
        message: "Database error"
      });
    }

    res.render(path.join(__dirname, "../../views/reddit/"), {
      authenticated: req.session.authenticated,
      sessionID: req.session.sessionID,
      state: req.session.state
      // view: view
    });
  } else {
    logger.info({
      ip: req.header("x-forwarded-for") || req.connection.remoteAddress,
      message: "User is not authenticated"
    });

    res.redirect(process.env.BASEURL);
  }
});

/**
 * Go to this route after successfully authenticating via Reddit OAuth flow.
 */
redditRouter.get("/success", async (req, res) => {
  //If there is no queries then redirect
  if (_.isEmpty(req.query)) {
    res.redirect(REDIRECT_URL);
    return;
  }
  //If someone hijacked the state and they don't match, log the error.
  if (req.query.state !== req.session.state) {
    console.log(req.query.code, req.session.state);
    logger.info({
      ip: req.header("x-forwarded-for") || req.connection.remoteAddress,
      message: `${req.query.code} does not match ${req.session.state} code !== session`
    });
    res.send("State does not match.");
  }

  const code = req.query.code;
  const state = req.query.state;

  /**
   * Store credentials in DB securely and redirect to authenticated route.
   * userID is also the sessionID and dbName. They are all the same.
   */
  try {
    const userID = req.session.sessionID;

    const auth = await getAuth(userID);
    // UPDATE If user exists, just update tokens and revoke the previous tokens
    if (auth) {
      logger.info({ message: `Update user: ${userID}` });
      const details = await retrieveAccessToken(code, userID);
      const updatedUser = await updateAuth(userID, {
        access_token: details.access_token,
        refresh_token: details.refresh_token
      });
      console.log(updatedUser);
      // CREATE else if user does not exist, create a new user within db and add new tokens.
    } else {
      logger.info({ message: `Create new user: ${userID}` });
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
    logger.info({
      ip: req.header("x-forwarded-for") || req.connection.remoteAddress,
      message: error
    });
  }
});

// Show all posts
redditRouter.get("/views/all", async (req, res) => {
  const db = nano.use(req.session.sessionID); // db is the same name as the sessionID
  const data = await db.view("post_view", "all", {
    include_docs: true
  });
  res.json(data);
});

// Get a post by id
redditRouter.get("/getPost/:id/", async (req, res) => {
  const id = req.params.id;
  const data = await getCommentById(id, snoowrapConfig);
  res.json(data);
});

// ...:upvotes/* is optional
redditRouter.get("/getPost/expanded/:id/", async (req, res) => {
  const id = req.params.id;
  const data = await getCommentByIdExpanded(id, -100, snoowrapConfigLongDelay);
  res.json(data);
});

// Get a post expanded, requires alot of requests and may hang due to too many requests
redditRouter.get("/getPost/expanded/:id/ups/:ups", async (req, res) => {
  const id = req.params.id;
  const upvotes: number = req.params.ups;
  const data = await getCommentByIdExpanded(
    id,
    upvotes,
    snoowrapConfigLongDelay
  );
  res.json(data);
});

/**
 * Revoke/Destroy access token
 */
// http://[address]/reddit/destroy
redditRouter.get("/destroy", () => {
  // Destroy session id in database
});

redditRouter.post("/addRedditPost/submission/:id", async (req, res) => {
  if (process.env.MODE === "Development") {
    req.session.authenticated = true;
    req.session.sessionID = "gre-uniqueid";
  }

  if (req.params.id) {
    const post = await getSubmissionById(req.params.id, snoowrapConfig);
    const addedPost = await addRedditPost(req.session.sessionID, post);
    // Log the API call
    logger.info({
      ip: req.header("x-forwarded-for") || req.connection.remoteAddress,
      message: req.params.id
    });
    res.end(req.params.id);
  } else {
    res.end(null);
  }
});

// Refresh tokens. Revoke before refreshing.
// http://[address]/reddit/refresh
redditRouter.post("/refresh", async (req, res) => {
  const userID = req.session.sessionID;
  try {
    const authDetails = await getAuth(userID);
    const rToken = await refreshToken(authDetails["refresh_token"]);
    const updateToken = await updateAuth(userID, {
      //updateAuth also revokes previous tokens
      access_token: authDetails["access_token"],
      refresh_token: authDetails["refresh_token"]
    });
    // res.redirect(lastPage); // Redirect to the last page
    res.end(userID);
  } catch (error) {
    logger.info({
      ip: req.header("x-forwarded-for") || req.connection.remoteAddress,
      message: "Unable to refresh token."
    });
    res.end(null);
  }
});

export default redditRouter;
