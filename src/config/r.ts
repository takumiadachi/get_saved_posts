require("dotenv").config();
import snoowrap from "snoowrap";

const USER_AGENT = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246c`;

const r = new snoowrap({
  userAgent: USER_AGENT,
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  refreshToken: process.env.REDDIT_REFRESH_TOKEN
});

// console.log(USER_AGENT);
// console.log(process.env.REDDIT_CLIENT_ID);
// console.log(process.env.REDDIT_CLIENT_SECRET);
// console.log(process.env.REDDIT_USERNAME);
// console.log(process.env.REDDIT_PASSWORD);

// Alternatively, just pass in a username and password for script-type apps.
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
 * rMe2 has a longer request delay for operations that require it
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

export { rMe, rMe2, r };
