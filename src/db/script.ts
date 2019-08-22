/**
 * This is a script to load reddit data sets into CouchDB for development purposes.
 */

// CouchDB
import { nano } from "../db/couchdb/connect";
import { createUserDb } from "../db/couchdb/methods/createUserDb";
import { removeUserDb } from "../db/couchdb/methods/removeUserDb";
import { addPost } from "../db/couchdb/methods/reddit/addPost";
import PostView from "../db/couchdb/views/reddit/postView";
import getSubmissionById from "../api/reddit/v1/getSubmissionById";

// DB
(async () => {
  // Destroy/Create DB
  const destroyed = await removeUserDb("UniqueUser");
  console.log(destroyed);
  const created = await createUserDb("UniqueUser");
  console.log(created);
  // const comment = await getCommentById("ewunlr7");

  // Add the Posts
  let submission = await getSubmissionById("cstxi8");
  let added = await addPost("uniqueuser", submission);
  submission = await getSubmissionById("ctkecb"); // over 14k comments
  added = await addPost("uniqueuser", submission);
  submission = await getSubmissionById("ctwcz2");
  added = await addPost("uniqueuser", submission);
  submission = await getSubmissionById("ctrz8g");
  added = await addPost("uniqueuser", submission);
  submission = await getSubmissionById("ctvpcs");
  added = await addPost("uniqueuser", submission);
  // const got = await getPost("uniqueuser", "cstxi8");

  // Add the Views
  const db = nano.use("uniqueuser");
  const addView = await db.insert(new PostView(), "_design/post_view");
  const tryView = await db.view("post_view", "all", {
    key: "cstxi8",
    include_docs: true
  });
  console.log(tryView);
})();
