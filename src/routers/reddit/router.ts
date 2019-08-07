require("dotenv").config();
import express from "express";
import _ from "lodash";
import retrieveAccessToken from "./retrieveAccessToken";
import path from "path";
import uuidv1 from "uuid/v1";
let redditRouter = express.Router();

/**
 * REDDIT
 */
const REDIRECT_URL = "http://localhost:4201/reddit";

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

redditRouter.get("/success", async (req, res) => {
  console.log(req.query);
  if (_.isEmpty(req.query)) {
    res.redirect(REDIRECT_URL);
    return;
  }
  const code = req.query.code;
  const state = req.query.state;

  try {
    const accessToken = await retrieveAccessToken(code);
    console.log(accessToken);
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
