import { TrimmedComment } from "../../../models/TrimmedComment";
import moment from "moment";
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
        moment.unix(comment.created).format("DD-MM-YYYY h:mm:ss"),
        comment.permalink,
        comment.replies
      );

      return trimmedComment;
    })
    .catch(err => {
      console.log(err);
      return null;
    });
}
