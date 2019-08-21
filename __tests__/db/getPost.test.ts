import { getPost } from "../../src/db/couchdb/methods/reddit/getPost";
import { removeUserDb } from "../../src/db/couchdb/methods/removeUserDb";
import { createUserDb } from "../../src/db/couchdb/methods/createUserDb";
import { addPost } from "../../src/db/couchdb/methods/reddit/addPost";
import { nano } from "../../src/db/couchdb/connect";
import PostView from "../../src/db/couchdb/views/reddit/postView";
import getSubmissionById from "../../src/api/reddit/v1/getSubmissionById";

beforeAll(async () => {
  const destroyed = await removeUserDb("UniqueUser");
  console.log(destroyed);
  const created = await createUserDb("UniqueUser");
  console.log(created);
  const submission = await getSubmissionById("cstxi8");
  const added = await addPost("uniqueuser", submission);
});

describe("getPost DB async works", () => {
  beforeAll(async () => {});

  test("should return null", async () => {
    const submission = await getPost("uniqueuser", "this is a bad id");
    expect(submission).toBe(null);
  }, 10000); // Jest.timeout defaults to 5000, so set it to 10000 for more time

  test("should show a submission from /r/nba about DeMarcus Cousins injury", async () => {
    const submission = await getPost("uniqueuser", "cstxi8");

    expect(submission["title"]).toContain("struggles");
  }, 10000);
});
