require("dotenv").config();
import snoowrap from "snoowrap";

const USER_AGENT = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246c`;

// console.log(USER_AGENT);
// console.log(process.env.REDDIT_CLIENT_ID);
// console.log(process.env.REDDIT_CLIENT_SECRET);
// console.log(process.env.REDDIT_USERNAME);
// console.log(process.env.REDDIT_PASSWORD);

/**
 * Has a request delay of 100. It will go over Reddit's rate limits if there is too many requests
 */
const r = new snoowrap({
  userAgent: USER_AGENT,
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  refreshToken: process.env.REDDIT_REFRESH_TOKEN
});

r.config({
  requestDelay: 100
  // warnings: true
});

/**
 * rMe2 has a longer request delay for operations that require it to prevent going over rate limits.
 *
 * Does not use a username/password.
 */
const r2 = new snoowrap({
  userAgent: USER_AGENT,
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  refreshToken: process.env.REDDIT_REFRESH_TOKEN
});

r2.config({
  requestDelay: 100
  // warnings: true
});

/**
 * Has a request delay of 100. It will go over Reddit's rate limits if there is too many requests
 *
 * Uses a username/password.
 */
const rMe = new snoowrap({
  userAgent: USER_AGENT,
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  username: process.env.REDDIT_USERNAME,
  password: process.env.REDDIT_PASSWORD
});

rMe.config({
  requestDelay: 100
  // warnings: true
});

/**
 * rMe2 has a longer request delay for operations that require it to prevent going over rate limits.
 *
 * Uses a username/password.
 */
const rMe2 = new snoowrap({
  userAgent: USER_AGENT,
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  username: process.env.REDDIT_USERNAME,
  password: process.env.REDDIT_PASSWORD
});

rMe.config({
  requestDelay: 1000
  // warnings: true
});

export { r, r2, rMe, rMe2 };
