require("dotenv").config();
import express from "express";
import _ from "lodash";
import retrieveAccessToken from "./retrieveAccessToken";
import path from "path";
let redditRouter = express.Router();

/**
 * REDDIT
 */
const REDIRECT_URL = "http://localhost:4201/reddit";

// http://[address]/reddit
redditRouter.get("/", (req, res) => {
  res.render(path.join(__dirname, "views/index.pug"), {
    test: "test"
  });
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

    res.redirect(REDIRECT_URL);
  } catch (error) {
    console.log(error);
  }
});

export default redditRouter;
