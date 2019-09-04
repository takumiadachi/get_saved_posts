import TrimmedComment from "../../../models/reddit/TrimmedComment";
import { Comment, Listing } from "snoowrap";
import snoowrap from "snoowrap";

/**
 * Get comment by id and expand every comment. Requires alot of requests to Reddit API.
 *
 * @param id
 * @param upVotes
 * @param snoowrapClient
 */
export default async function getCommentByIdExpanded(
  id: string,
  upVotes: number = -10,
  snoowrapClient: snoowrap
): Promise<TrimmedComment> {
  // Change this to async await in the future
  let total = 0;
  return snoowrapClient
    .getComment(id)
    .fetch()
    .then(comment => comment.expandReplies())
    .then(expanded => {
      // Trims Snoowrap.comment to have less properties and uses upvote threshold
      function trim(expanded: Listing<Comment>, upVotes: number) {
        // Base case
        if (!expanded) {
          return null;
        } else {
          let trimmedComments = new Array<TrimmedComment>();
          for (const comment of expanded) {
            const trimmedComment = new TrimmedComment(
              comment.id,
              comment.ups,
              comment.body,
              comment.created,
              comment.permalink,
              comment.author.name,
              comment.parent_id,
              comment.replies ? trim(comment.replies, upVotes) : null
            );
            if (trimmedComment.ups > upVotes) {
              total += 1;
              trimmedComments.push(trimmedComment);
            }
          }
          return trimmedComments;
        }
      }

      // Root to trim function on
      const TopComment: TrimmedComment = new TrimmedComment(
        expanded.id,
        expanded.ups,
        expanded.body,
        expanded.created,
        expanded.permalink,
        expanded.author.name,
        expanded.parent_id,
        trim(expanded.replies, upVotes)
      );
      // Add one for the top level comment
      TopComment.setCount(++total);
      return TopComment;
    })
    .catch(err => {
      console.log(err);
      return null;
    });
}
