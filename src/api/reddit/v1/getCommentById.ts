import snoowrap from "snoowrap";
import {
  snoowrapConfig,
  snoowrapConfigLongDelay,
  snoowrapConfigUser
} from "@src/config/reddit/config";
import TrimmedComment from "@src/models/reddit/TrimmedComment";

/**
 * Get comment by id
 *
 * @param id
 * @param snoowrapClient
 */
export default async function getCommentById(
  id: string,
  snoowrapClient: snoowrap
): Promise<TrimmedComment> {
  // Change this to async await in the future
  return snoowrapClient
    .getComment(id)
    .fetch()
    .then(comment => {
      const trimmedComment = TrimmedComment.fromComment(comment);
      return trimmedComment;
    })
    .catch(err => {
      // console.log(err);
      return null;
    });
}
