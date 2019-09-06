import getStoryAndCommentsById from "@src/api/hackernews/v0/getStoryAndCommentsById";
import addHNPost from "@src/db/couchdb/methods/hackernews/addHNPost";
import createUserDb from "@src/db/couchdb/methods/createUserDb";
import removeUserDb from "@src/db/couchdb/methods/removeUserDb";

beforeAll(async done => {
  const destroyed = await removeUserDb("testhndb");
  console.log(destroyed);
  const created = await createUserDb("testhndb");
  console.log(created);
  // console.log(added);
  done();
}, 100000);

describe("addHNPost DB async works", () => {
  test("should add a hacker news (HN) story with comments", async () => {
    const story = await getStoryAndCommentsById("20857887");
    const added = await addHNPost("testhndb", story);
    expect(added.by).toContain("promesante");
  }, 50000);
});
