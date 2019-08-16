import { rMe } from "../../../config/r";
import { TrimmedSubmission } from "../../../models/TrimmedSubmission";
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
      const trimmedSubmission = TrimmedSubmission.fromSubmission(submission);
      return trimmedSubmission;
    })
    .catch(err => {
      console.log(err);
      return null;
    });
}
