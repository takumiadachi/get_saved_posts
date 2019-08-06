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
  if (req.session.authenticated) {
    res.render(path.join(__dirname, "views/index.pug"), {
      test: "authed"
    });
  } else {
    res.render(path.join(__dirname, "views/index.pug"), {
      test: "not authed"
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
    req.session.authenticated = true;
    res.redirect(REDIRECT_URL);
  } catch (error) {
    console.log(error);
  }
});

// app.get("/test", async (req, res) => {
//   console.log(req.session);
//   if (req.session.views) {
//     req.session.views++;
//     res.setHeader("Content-Type", "text/html");
//     res.write("<p>views: " + req.session.views + "</p>");
//     res.write("<p>expires in: " + req.session.cookie.maxAge / 1000 + "s</p>");
//     res.end();
//   } else {
//     req.session.views = 1;
//     res.end("welcome to the session demo. refresh!");
//   }
// });

export default redditRouter;
