import getCommentByIdExpanded from "./api/reddit/v1/getCommentByIdExpanded";
import getSavedSubmissions from "./api/reddit/v1/user/getSavedSubmissions";
import getCommentById from "./api/reddit/v1/getCommentById";
const fs = require("fs");
// CouchDB
import { createUserDb } from "./db/couchdb/methods/createUserDb";
import { removeUserDb } from "./db/couchdb/methods/removeUserDb";
import { addRedditPost } from "./db/couchdb/methods/reddit/addRedditPost";
import { TrimmedComment } from "./models/TrimmedComment";
import { getRedditPost } from "./db/couchdb/methods/reddit/getRedditPost";

// API
(async () => {
  // const data = await getCommentById("ewunlr7");
  // const json = JSON.stringify(data);
  // console.log(json);
  // https://www.reddit.com/r/Fitness/comments/cqqdk8/are_there_any_benefits_to_being_in_ketosis_vs/ewye3if?utm_source=share&utm_medium=web2x
  // const content = await getCommentByIdExpanded("ewye3if", -40); // Replace ev0azy2 with another comment id
  // const json = JSON.stringify(content);
  // fs.writeFile("reddit_me.json", json, (err, result) => {
  //   if (err) console.log("error", err);
  // });
  // const content = await getSavedSubmissions("crush"); // Replace ev0azy2 with another comment id
  // const json = JSON.stringify(content);
  // fs.writeFile("reddit_me.json", json, (err, result) => {
  //   if (err) console.log("error", err);
  // });
})();

// DB
(async () => {
  const destroyed = await removeUserDb("UniqueUser");
  console.log(destroyed);
  const created = await createUserDb("UniqueUser");
  console.log(created);
  // const view = await getRedditPost("uniqueuser");
})();
