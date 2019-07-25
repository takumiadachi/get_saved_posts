require("dotenv").config();
import { Submission, Listing, Comment } from "snoowrap";
import _ from "lodash";
import { TrimmedComment } from "./TrimmedComment";
import { rMe } from "./r";
import moment = require("moment");
const fs = require("fs");

// Get saved user posts
async function getSavedPosts(
  search: string
): Promise<(Comment | Submission)[]> {
  const savedContent = await rMe.getMe().getSavedContent();
  const allSavedContent = await savedContent.fetchAll();
  // Get all saved content urls
  const filteredContent: (Comment | Submission)[] = allSavedContent.filter(
    (submission: Submission) => {
      if (submission.title) {
        if (submission.title.includes(search)) {
          return submission;
        }
      }
    }
  );
  return filteredContent;
}

async function getSavedPost(
  id: string,
  upVotes: number
): Promise<TrimmedComment> {
  // Change this to async await in the future

  return rMe
    .getSubmission(id)
    .fetch()
    .then(submission =>
      submission.comments.fetchMore({
        amount: 1
      })
    )
    .then(filteredComments => <Comment>filteredComments[0].expandReplies())
    .then(expanded => {
      // Trims Snoowrap.comment to have less properties and uses upvote threshold
      function trim(expanded: Listing<Comment>, upVotes: number) {
        if (!expanded) {
          return null;
        } else {
          let trimmedComments = new Array<TrimmedComment>();
          for (const comment of expanded) {
            const trimmedComment = new TrimmedComment(
              comment.ups,
              comment.body,
              moment.unix(comment.created).format("DD-MM-YYYY h:mm:ss"),
              comment.replies ? trim(comment.replies, upVotes) : null
            );
            if (trimmedComment.ups > upVotes) {
              trimmedComments.push(trimmedComment);
            }
          }
          return trimmedComments;
        }
      }

      const TopComment: TrimmedComment = new TrimmedComment(
        expanded.ups,
        expanded.body,
        moment.unix(expanded.created).format("DD-MM-YYYY h:mm:ss"),
        trim(expanded.replies, upVotes)
      );
      return TopComment;
    });
}

(async () => {
  // const topTrimmedComment = await getSavedPost("av816j", 10);
  // console.log(topTrimmedComment);
  const submissions = await getSavedPosts("");
})();
