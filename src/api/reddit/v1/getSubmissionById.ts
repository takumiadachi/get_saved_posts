import { rMe } from "../../../config/r";
import TrimmedSubmission from "../../../models/reddit/TrimmedSubmission";
import { Listing, Comment } from "snoowrap";
import TrimmedComment from "../../../models/reddit/TrimmedComment";
const fs = require("fs");
/**
 * Get comment by id and expand every comment. Requires alot of requests to Reddit API.
 *
 * @param id
 * @param upVotes
 */
export default async function getSubmissionById(
  id: string
): Promise<TrimmedSubmission> {
  return rMe
    .getSubmission(id)
    .fetch()
    .then(submission => {
      function trim(replies: Listing<Comment>) {
        if (!replies) {
          return null;
        } else {
          let trimmedComments = new Array<TrimmedComment>();
          for (const comment of replies) {
            const trimmedComment = new TrimmedComment(
              comment.id,
              comment.ups,
              comment.body,
              comment.created,
              comment.permalink,
              comment.author.name,
              comment.parent_id,
              comment.replies ? trim(comment.replies) : null
            );
            trimmedComments.push(trimmedComment);
          }
          return trimmedComments;
        }
      }
      const comments = trim(submission.comments);
      const trimmedSubmission = TrimmedSubmission.fromSubmission(submission);
      trimmedSubmission.comments = comments;

      return trimmedSubmission;
    })
    .catch(err => {
      console.log(err);
      return null;
    });
}
