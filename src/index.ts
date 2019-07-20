require("dotenv").config();
import snoowrap from "snoowrap";

const USER_AGENT = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246c`;
console.log("test");
const r = new snoowrap({
  userAgent: USER_AGENT,
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  refreshToken: process.env.REDDIT_REFRESH_TOKEN
});

// Printing the content of a wiki page
// (async () => {
//   try {
//     const content = await r.getSubreddit("AskReddit").getWikiPage("bestof")
//       .content_md;

//     console.log(content);
//   } catch (err) {
//     console.error(err);
//   }
// })();

// Printing a list of the titles on the front page
(async () => {
  try {
    const content = await r.getHot();
  } catch (err) {
    console.error(err);
  }
})();
