import getCommentByIdExpanded from "./api/reddit/v1/getCommentByIdExpanded";
import getSavedSubmissions from "./api/reddit/v1/user/getSavedSubmissions";
import getCommentById from "./api/reddit/v1/getCommentById";
const fs = require("fs");
// CouchDB
import { createUserDb } from "./db/couchdb/methods/createUserDb";
import { removeUserDb } from "./db/couchdb/methods/removeUserDb";
import { addPost } from "./db/couchdb/methods/reddit/addPost";
import { TrimmedComment } from "./models/TrimmedComment";
import { nano } from "./db/couchdb/connect";
import PostView from "./db/couchdb/views/reddit/postView";

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
  // const destroyed = await removeUserDb("UniqueUser");
  // console.log(destroyed);
  // const created = await createUserDb("UniqueUser");
  // console.log(created);
  // const comment = await getCommentById("ewunlr7");
  // const added = await addPost("uniqueuser", comment);
  // console.log(added);
  const db = nano.use("uniqueuser");
  // const addView = await db.insert(new PostView(), "_design/post_view");
  const tryView = await db.view("post_view", "all", {
    key:
      "/r/AskWomen/comments/cq8yop/how_do_you_maximise_your_time_in_the_evening/ewunlr7/"
  });
  console.log(tryView);
})();
