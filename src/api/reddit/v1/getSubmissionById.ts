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

(async () => {
  const data = await getSubmissionById("2np694");
  console.log(data);
  // const json = JSON.stringify(data);
  // fs.writeFile("./reddit_me.json", json, (err, result) => {
  //   if (err) console.log("error", err);
  // });
})();
