require("dotenv").config();
import express from "express";
let redditRouter = express.Router();

/**
 * REDDIT
 */

// http://[address]/reddit
redditRouter.get("/", (req, res) => {
  res.send("reddit/router");
});

export default redditRouter;
