import getCommentByIdExpanded from "./api/reddit/v1/getCommentByIdExpanded";
import getSavedSubmissions from "./api/reddit/v1/user/getSavedSubmissions";
import getCommentById from "./api/reddit/v1/getCommentById";
const fs = require("fs");
import { TrimmedComment } from "./models/reddit/TrimmedComment";
import PostView from "./db/couchdb/views/reddit/postView";
import getSubmissionById from "./api/reddit/v1/getSubmissionById";

// API
(async () => {
  // https://www.reddit.com/r/Fitness/comments/cqqdk8/are_there_any_benefits_to_being_in_ketosis_vs/ewye3if?utm_source=share&utm_medium=web2x
  // const data = await getCommentById("ewunlr7");
  // const json = JSON.stringify(data);
  // console.log(json);
  const content = await getCommentByIdExpanded("exkcima", -40); // Replace ev0azy2 with another comment id
  const json = JSON.stringify(content);
  fs.writeFile("reddit_me.json", json, (err, result) => {
    if (err) console.log("error", err);
  });
  // const content = await getSavedSubmissions("crush"); // Replace ev0azy2 with another comment id
  // const json = JSON.stringify(content);
  // fs.writeFile("reddit_me.json", json, (err, result) => {
  //   if (err) console.log("error", err);
  // });
  // const content = await getSubmissionById("cstxi8");
  // const json = JSON.stringify(content);
  // fs.writeFile("reddit_me.json", json, (err, result) => {
  //   if (err) console.log("error", err);
  // });
})();
