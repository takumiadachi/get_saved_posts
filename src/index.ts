require("dotenv").config();
import snoowrap, { Submission, Listing, Comment } from "snoowrap";
import _ from "lodash";
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
    const savedContent = await rMe.getMe().getSavedContent();
    const allSavedContent = await savedContent.fetchAll();
    let count = 0;
    // Get all saved content urls
    const filteredContent: (Comment | Submission)[] = allSavedContent.filter(
      (submission: Submission) => {
        if (submission.title) {
          if (submission.title.includes("crush")) {
            return submission;
          }
        }
      }
    );
    const sub = filteredContent[0];

    if ((<Submission>sub).title) {
      console.log((<Submission>sub).title);
    }
    // const json = JSON.stringify(content);
    // fs.writeFile("reddit_me.json", json, (err, result) => {
    //   if (err) console.log("error", err);
    // });
  } catch (err) {
    console.error(err);
  }
})();
