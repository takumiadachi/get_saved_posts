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
let rMe = new snoowrap({
  userAgent: USER_AGENT,
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  username: process.env.REDDIT_USERNAME,
  password: process.env.REDDIT_PASSWORD
});

// Get saved user posts
(async () => {
  try {
    const savedContent = await rMe.getMe().getSavedContent();
    const allSavedContent = await savedContent.fetchAll();
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
    // Get only the first comment of the submission
    const filteredComments = await (<Submission>sub).comments.fetchMore({
      amount: 1
    });

    <Comment>filteredComments[0].expandReplies().then(expanded => {
      function trim(expanded: Listing<Comment>) {
        if (!expanded) {
          return null;
        } else {
          let trimmedComments = new Array<TrimmedComment>();
          for (const comment of expanded) {
            const trimmedComment = new TrimmedComment(
              comment.created,
              comment.ups,
              comment.body,
              comment.replies ? trim(comment.replies) : null
            );
            trimmedComments.push(trimmedComment);
          }
          return trimmedComments;
        }
      }

      const TopComment: TrimmedComment = new TrimmedComment(
        expanded.created,
        expanded.ups,
        expanded.body,
        trim(expanded.replies)
      );

      const json = JSON.stringify(TopComment);
      fs.writeFile("trimmedExpandedTopComment.json", json, (err, result) => {
        if (err) console.log("error", err);
      });
    });
  } catch (err) {
    console.error(err);
  }
})();

class TrimmedComment implements TrimmedComment {
  created: number;
  ups: number;
  body: string;
  replies?: Listing<Comment> | TrimmedComment[];

  constructor(created, ups, body, replies = null) {
    this.created = created;
    this.ups = ups;
    this.body = body;
    this.replies = replies;
  }
}

interface TrimmedComment {
  created: number;
  ups: number;
  body: string;
  replies?: Listing<Comment> | TrimmedComment[];
}
