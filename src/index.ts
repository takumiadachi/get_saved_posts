import getCommentByIdExpanded from "./api/reddit/v1/getCommentByIdExpanded";
import getSavedSubmissions from "./api/reddit/v1/user/getSavedSubmissions";
import getCommentById from "./api/reddit/v1/getCommentById";
const fs = require("fs");
// CouchDB
import { createUserDb } from "./db/couchdb/methods/createUserDb";
import { removeUserDb } from "./db/couchdb/methods/removeUserDb";
import { addPost } from "./db/couchdb/methods/reddit/addPost";
import { TrimmedComment } from "./models/reddit/TrimmedComment";
import { nano } from "./db/couchdb/connect";
import PostView from "./db/couchdb/views/reddit/postView";
import getSubmissionById from "./api/reddit/v1/getSubmissionById";
import { getPost } from "./db/couchdb/methods/reddit/getPost";

// API
(async () => {
  // https://www.reddit.com/r/Fitness/comments/cqqdk8/are_there_any_benefits_to_being_in_ketosis_vs/ewye3if?utm_source=share&utm_medium=web2x
  // const data = await getCommentById("ewunlr7");
  // const json = JSON.stringify(data);
  // console.log(json);
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
  // const content = await getSubmissionById("cstxi8");
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
  // const comment = await getCommentById("ewunlr7");
  const submission = await getSubmissionById("cstxi8");
  const added = await addPost("uniqueuser", submission);
  // const got = await getPost("uniqueuser", "cstxi8");
  // console.log(added);
  const db = nano.use("uniqueuser");
  const addView = await db.insert(new PostView(), "_design/post_view");
  const tryView = await db.view("post_view", "all", {
    key: "cstxi8",
    include_docs: true
  });
  console.log(tryView);
})();
