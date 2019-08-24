require("dotenv").config();
import express from "express";
import _ from "lodash";
import retrieveAccessToken from "./auth/retrieveAccessToken";
import path from "path";
import uuidv1 from "uuid/v1";
import refreshToken from "./auth/retrieveRefreshToken";
import getCommentById from "../../api/reddit/v1/getCommentById";
import getCommentByIdExpanded from "../../api/reddit/v1/getCommentByIdExpanded";
import Details from "./auth/model/details";
import nano from "../../db/couchdb/connect";
import createAuth from "../../db/couchdb/auth/createAuth";
import { getAuth } from "../../db/couchdb/auth/getAuth";
let redditRouter = express.Router();

/**
 * REDDIT
 */
const REDIRECT_URL = `${process.env.BASEURL}/reddit`;

// http://[address]/reddit
redditRouter.get("/", async (req, res) => {
  const details = await getAuth(req.session.sessionID);
  // console.log(details);
  if (details) {
    res.render(path.join(__dirname, "views/index.pug"), {
      authenticated: true,
      sessionID: req.session.sessionID,
      state: req.session.state
    });
  } else {
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
  console.log(req.params.id);
  const data = await getCommentByIdExpanded(id, -100);
  res.json(data);
});

redditRouter.get("/getPost/expanded/:id/ups/:ups", async (req, res) => {
  const id = req.params.id;
  console.log(req.params.id);
  const upvotes: number = req.params.ups;
  const data = await getCommentByIdExpanded(id, upvotes);
  res.json(data);
});

redditRouter.get("/success", async (req, res) => {
  // console.log("req.query", req.query);
  if (_.isEmpty(req.query)) {
    res.redirect(REDIRECT_URL);
    return;
  }
  const code = req.query.code;
  const state = req.query.state;

  try {
    console.log("req.session", req.session.sessionID);
    const details = await retrieveAccessToken(code);
    details.setId(req.session.sessionID);
    /**
     * STORE THIS IN DB
     */
    const createdAuth = await createAuth(req.session.sessionID, details);
    req.session.authenticated = true;
    req.session.state = req.query.state;
    // Redirect to authenticated route.
    await res.redirect(REDIRECT_URL);
  } catch (error) {
    console.log(error);
  }
});

// http://[address]/reddit/destroy
redditRouter.get("/destroy", (req, res) => {
  // Destroy session id in database
});

// http://[address]/reddit/refresh
redditRouter.get("/refresh", async (req, res) => {
  // console.log(details);
  // if (!details.refresh_token) {
  //   res.redirect(REDIRECT_URL);
  //   return;
  // }
  const code = req.query.code;
  const state = req.query.state;

  try {
    // const stuff = await refreshToken(details.refresh_token);
    // console.log(stuff);
    // Set authentication stuff up.
    req.session.authenticated = true;
    req.session.state = req.query.state;
    // Redirect to authenticated route.
    res.redirect(REDIRECT_URL);
  } catch (error) {
    console.log(error);
  }
});

export default redditRouter;
