/**
 * This is a script to load reddit data sets into CouchDB for development purposes.
 */

// CouchDB
import nano from "../db/couchdb/connect";
import createUserDb from "../db/couchdb/methods/createUserDb";
import removeUserDb from "../db/couchdb/methods/removeUserDb";
import addRedditPost from "../db/couchdb/methods/reddit/addRedditPost";
import PostView from "../db/couchdb/views/reddit/postView";
import addView from "./couchdb/methods/addView";
import getSubmissionById from "../api/reddit/v1/getSubmissionById";

// DB
(async () => {
  const dbName = "gre-uniqueid";

  // Destroy/Create DB
  const destroyed = await removeUserDb("gre-uniqueid");
  console.log(destroyed);
  const created = await createUserDb("gre-uniqueid");
  console.log(created);
  // const comment = await getCommentById("ewunlr7");

  // Add the Posts
  let submission = await getSubmissionById("cstxi8");
  let added = await addRedditPost(dbName, submission);
  submission = await getSubmissionById("ctkecb"); // over 14k comments
  added = await addRedditPost(dbName, submission);
  submission = await getSubmissionById("ctwcz2");
  added = await addRedditPost(dbName, submission);
  submission = await getSubmissionById("ctrz8g");
  added = await addRedditPost(dbName, submission);
  submission = await getSubmissionById("ctvpcs");
  added = await addRedditPost(dbName, submission);
  // const got = await getPost("uniqueuser", "cstxi8");

  // Add the Views

  // const addView = await db.insert(new PostView(), "_design/post_view");
  const addedView = await addView(
    "gre-uniqueid",
    new PostView(),
    "_design/post_view"
  );
  const db = nano.use(dbName);
  const tryView = await db.view("post_view", "all", {
    key: "cstxi8",
    include_docs: true
  });
  console.log(tryView);
})();
