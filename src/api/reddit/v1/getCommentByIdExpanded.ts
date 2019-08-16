import { TrimmedComment } from "../../../models/TrimmedComment";
import { Comment, Listing } from "snoowrap";
import { r } from "../../../config/r";

/**
 * Get comment by id and expand every comment. Requires alot of requests to Reddit API.
 *
 * @param id
 * @param upVotes
 */
export default async function getCommentByIdExpanded(
  id: string,
  upVotes: number = -10
): Promise<TrimmedComment> {
  // Change this to async await in the future
  let total = 0;
  return r
    .getComment(id)
    .fetch()
    .then(comment => comment.expandReplies())
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
              comment.created,
              comment.permalink,
              comment.author,
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

      const TopComment: TrimmedComment = new TrimmedComment(
        expanded.ups,
        expanded.body,
        expanded.created,
        expanded.permalink,
        expanded.author,
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
