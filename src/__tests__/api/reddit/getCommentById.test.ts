import {
  snoowrapConfig,
  snoowrapConfigLongDelay
} from "@src/config/reddit/config";
import getCommentById from "@src/api/reddit/v1/getCommentById";

describe("getPostById async works", () => {
  beforeAll(async () => {});

  test("should return null", async () => {
    const comment = await getCommentById("this is a bad id", snoowrapConfig);
    expect(comment).toBe(null);
  });

  test("comment body should contain 'sinus infection'", async () => {
    const comment = await getCommentById("evkxj13", snoowrapConfigLongDelay);
    expect(comment.body).toContain("sinus infection");
  });
});
