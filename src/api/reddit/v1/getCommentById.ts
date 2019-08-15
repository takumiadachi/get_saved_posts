import { TrimmedComment } from "../../../models/TrimmedComment";
import { rMe } from "../../../config/r";

/**
 * Get comment by id
 *
 * @param id
 * @param upVotes
 */
export default async function getCommentById(
  id: string
): Promise<TrimmedComment> {
  // Change this to async await in the future
  return rMe
    .getComment(id)
    .fetch()
    .then(comment => {
      const trimmedComment = new TrimmedComment(
        comment.ups,
        comment.body,
        comment.created,
        comment.permalink,
        comment.name,
        comment.replies
      );

      return trimmedComment;
    })
    .catch(err => {
      console.log(err);
      return null;
    });
}
