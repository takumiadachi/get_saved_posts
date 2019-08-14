import { TrimmedComment } from "../../../models/TrimmedComment";
import moment from "moment";
import { Comment, Listing } from "snoowrap";
import { rMe } from "../../../config/r";
const fs = require("fs");
/**
 * Get comment by id and expand every comment. Requires alot of requests to Reddit API.
 *
 * @param id
 * @param upVotes
 */
export default async function getSubmissionById(id: string) {
  return rMe
    .getSubmission(id)
    .fetch()
    .then(submission => {
      // console.log(submission);
      return submission;
    })
    .catch(err => {
      console.log(err);
      return null;
    });
}

(async () => {
  const data = await getSubmissionById("2np694");
  const json = JSON.stringify(data);
  fs.writeFile("./reddit_me.json", json, (err, result) => {
    if (err) console.log("error", err);
  });
})();
