import { TrimmedComment } from "../models/TrimmedComment";
import moment from "moment";
import { Comment, Listing } from "snoowrap";
import { rMe } from "../config/r";

export default async function getPostByIdExpanded(
  id: string,
  upVotes: number
): Promise<TrimmedComment> {
  // Change this to async await in the future
  let total = 0;
  return rMe
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
              moment.unix(comment.created).format("DD-MM-YYYY h:mm:ss"),
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
        moment.unix(expanded.created).format("DD-MM-YYYY h:mm:ss"),
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
