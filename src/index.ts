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
    const filteredComments = await (<Submission>sub).comments.fetchMore({
      amount: 1
    });
    // filteredComments[0].expandReplies().then(expanded => {
    //   expanded.replies.forEach(c => {
    //     if (c) {
    //       const nc = new TrimmedComment(c.created, c.ups, c.body);
    //       console.log(nc);
    //     }
    //   });
    // });

    let expandedComment: Comment;
    <Comment>filteredComments[0].expandReplies().then(expanded => {
      function bar(expanded: Comment) {
        if (expanded.replies) {
          return bar(expanded.replies);
        }
        return expanded.replies;
      }
      expandedComment = bar(expanded);
    });
    // const expandedFilteredComments = await filteredComments.map((comment) => {
    //   try {
    //     const new: Comment = await comment.expandReplies()
    //     return new ;
    //   catch (err) {
    //     console.log(err)
    //   }

    // });
    // const TrimmedComments: TrimmedComment[] = filteredComments.map(
    //   comment =>
    //     new TrimmedComment(
    //       comment.created,
    //       comment.ups,
    //       comment.body,
    //       comment.replies
    //     )
    // );
    // console.log(TrimmedComments);

    const json = JSON.stringify(expandedComment);
    fs.writeFile("expandedFilteredComments.json", json, (err, result) => {
      if (err) console.log("error", err);
    });
  } catch (err) {
    console.error(err);
  }
})();

class TrimmedComment implements TrimmedComment {
  created: number;
  ups: number;
  body: string;
  replies?: Listing<Comment>;
  constructor(created, ups, body, replies = null) {
    this.created = created;
    this.ups = ups;
    this.body = body;
    if (!replies) {
      this.replies = null;
    } else {
      this.replies = replies.map(
        comment =>
          new TrimmedComment(
            comment.created,
            comment.ups,
            comment.body,
            comment.replies
          )
      );
      const trimReplies = replies => {
        if (replies !== null) {
          this.replies = replies.map(
            comment =>
              new TrimmedComment(
                comment.created,
                comment.ups,
                comment.body,
                comment.replies
              )
          );
          trimReplies(replies);
        }
        return replies;
      };
    }
  }
}

interface TrimmedComment {
  created: number;
  ups: number;
  body: string;
  replies?: Listing<Comment>;
}
