/**
 * This is a script to load reddit data sets into CouchDB for development purposes.
 */

// CouchDB
import addView from "./couchdb/methods/addView";
import getStoryAndCommentsById from "@src/api/hackernews/v0/getStoryAndCommentsById";
import addHNPost from "./couchdb/methods/hackernews/addHNPost";
import removeUserDb from "./couchdb/methods/removeUserDb";
import createUserDb from "./couchdb/methods/createUserDb";
import getSubmissionById from "@src/api/reddit/v1/getSubmissionById";
import addRedditPost from "./couchdb/methods/reddit/addRedditPost";
import PostView from "./couchdb/views/reddit/postView";
import nano from "./couchdb/connect";

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
