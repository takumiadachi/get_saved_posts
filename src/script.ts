/**
 * This is a script to load reddit data sets into CouchDB for development purposes.
 */

// CouchDB
import addView from "./db/couchdb/methods/addView";
import addHNPost from "./db/couchdb/methods/hackernews/addHNPost";
import removeUserDb from "./db/couchdb/methods/removeUserDb";
import createUserDb from "./db/couchdb/methods/createUserDb";
import addRedditPost from "./db/couchdb/methods/reddit/addRedditPost";
import nano from "./db/couchdb/connect";
import PostView from "./db/couchdb/views/reddit/PostView";
import getSubmissionById from "./api/reddit/v1/getSubmissionById";
import { snoowrapConfig } from "./config/reddit/config";
import getStoryAndCommentsById from "./api/hackernews/v0/getStoryAndCommentsById";

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
  let submission = await getSubmissionById("cstxi8", snoowrapConfig);
  let added = await addRedditPost(dbName, submission);
  submission = await getSubmissionById("ctkecb", snoowrapConfig); // over 14k comments
  added = await addRedditPost(dbName, submission);
  submission = await getSubmissionById("ctwcz2", snoowrapConfig);
  added = await addRedditPost(dbName, submission);
  submission = await getSubmissionById("ctrz8g", snoowrapConfig);
  added = await addRedditPost(dbName, submission);
  submission = await getSubmissionById("ctvpcs", snoowrapConfig);
  added = await addRedditPost(dbName, submission);
  let story = await getStoryAndCommentsById("20857887");
  const addedHNPost = await addHNPost("gre-uniqueid", story);
  console.log(addedHNPost);

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
