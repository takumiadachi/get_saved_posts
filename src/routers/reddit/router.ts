require("dotenv").config();
import express from "express";
import _ from "lodash";
import retrieveAccessToken from "./auth/retrieveAccessToken";
import path from "path";
import uuidv1 from "uuid/v1";
import refreshToken from "./auth/refreshToken";
import getCommentById from "../../api/reddit/v1/getCommentById";
import getCommentByIdExpanded from "../../api/reddit/v1/getCommentByIdExpanded";
import Details from "./auth/model/details";
let redditRouter = express.Router();

/**
 * REDDIT
 */
const REDIRECT_URL = "http://localhost:4201/reddit";

// DB
let details: Details = new Details();

// http://[address]/reddit
redditRouter.get("/", (req, res) => {
  console.log(req.session);
  if (req.session.authenticated) {
    res.render(path.join(__dirname, "views/index.pug"), {
      authenticated: true,
      sessionID: req.session.sessionID,
      state: req.session.state
    });
  } else {
    res.render(path.join(__dirname, "views/index.pug"), {
      authenticated: false,
      sessionID: null,
      state: null
    });
  }
});

redditRouter.get("/all", async (req, res) => {});

redditRouter.get("/getPost/:id/", async (req, res) => {
  const id = req.params.id;
  const json = await getCommentById(id);
  res.json(json);
});

redditRouter.get("/getPost/expanded/:id/:upvotes", async (req, res) => {
  const id = req.params.id;
  const upvotes: number = req.params.upvotes ? req.params.upvotes : -20;
  const json = await getCommentByIdExpanded(id, upvotes);
  res.json(json);
});

redditRouter.get("/success", async (req, res) => {
  console.log(req.query);
  if (_.isEmpty(req.query)) {
    res.redirect(REDIRECT_URL);
    return;
  }
  const code = req.query.code;
  const state = req.query.state;

  try {
    details = await retrieveAccessToken(code);
    console.log(details);
    // Set authentication stuff up.
    req.session.authenticated = true;
    req.session.sessionID = uuidv1();
    req.session.state = req.query.state;
    // req.session.details = details;
    // Redirect to authenticated route.
    res.redirect(REDIRECT_URL);
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
  console.log(req.query);
  if (_.isEmpty(req.query)) {
    res.redirect(REDIRECT_URL);
    return;
  }
  const code = req.query.code;
  const state = req.query.state;

  try {
    const stuff = await refreshToken(details.refresh_token);
    console.log(stuff);
    // Set authentication stuff up.
    req.session.authenticated = true;
    req.session.sessionID = uuidv1();
    req.session.state = req.query.state;
    // Redirect to authenticated route.
    res.redirect(REDIRECT_URL);
  } catch (error) {
    console.log(error);
  }
});

export default redditRouter;
