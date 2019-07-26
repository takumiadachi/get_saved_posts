// import { TrimmedComment } from "../TrimmedComment";
// import moment = require("moment");
// import { Comment, Submission, Listing } from "snoowrap";
// import { rMe } from "../config/r";

// export default async function getPostById(
//   id: string,
//   upVotes: number
// ): Promise<TrimmedComment> {
//   // Change this to async await in the future

//   return rMe
//     .getSubmission(id)
//     .fetch()
//     .then(submission =>
//       submission.comments.fetchAll({
//         amount: 1
//       })
//     )
//     .then(filteredComments => <Comment>filteredComments[0].expandReplies())
//     .then(expanded => {
//       // Trims Snoowrap.comment to have less properties and uses upvote threshold
//       function trim(expanded: Listing<Comment>, upVotes: number) {
//         if (!expanded) {
//           return null;
//         } else {
//           let trimmedComments = new Array<TrimmedComment>();
//           for (const comment of expanded) {
//             const trimmedComment = new TrimmedComment(
//               comment.ups,
//               comment.body,
//               moment.unix(comment.created).format("DD-MM-YYYY h:mm:ss"),
//               comment.replies ? trim(comment.replies, upVotes) : null
//             );
//             if (trimmedComment.ups > upVotes) {
//               trimmedComments.push(trimmedComment);
//             }
//           }
//           return trimmedComments;
//         }
//       }

//       const TopComment: TrimmedComment = new TrimmedComment(
//         expanded.ups,
//         expanded.body,
//         moment.unix(expanded.created).format("DD-MM-YYYY h:mm:ss"),
//         trim(expanded.replies, upVotes)
//       );
//       return TopComment;
//     });
// }
