require("dotenv").config();
import snoowrap, { Submission, Listing } from "snoowrap";
const fs = require("fs");

const USER_AGENT = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246c`;

const r = new snoowrap({
  userAgent: USER_AGENT,
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  refreshToken: process.env.REDDIT_REFRESH_TOKEN
});

// Alternatively, just pass in a username and password for script-type apps.
const rMe = new snoowrap({
  userAgent: USER_AGENT,
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  username: process.env.REDDIT_USERNAME,
  password: process.env.REDDIT_PASSWORD
});

// Printing a list of the titles on the front page
// (async () => {
//   try {
//     const content = await r.getHot();
//     const json = JSON.stringify(content);
//     fs.writeFile("front_page.json", json, (err, result) => {
//       if (err) console.log("error", err);
//     });
//   } catch (err) {
//     console.error(err);
//   }
// })();

// Get saved user posts
(async () => {
  try {
    const content = await rMe.getMe().getSavedContent();
    const allContent = content.fetchAll();
    allContent.map((submission: Submission, count) => {
      count += 1;
      console.log(submission.title, count);
    });
    // const json = JSON.stringify(content);
    // fs.writeFile("reddit_me.json", json, (err, result) => {
    //   if (err) console.log("error", err);
    // });
  } catch (err) {
    console.error(err);
  }
})();
