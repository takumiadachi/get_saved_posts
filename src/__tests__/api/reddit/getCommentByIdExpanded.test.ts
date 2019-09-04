import {
  snoowrapConfig,
  snoowrapConfigLongDelay
} from "@src/config/reddit/config";
import getCommentByIdExpanded from "../../../api/reddit/v1/getCommentByIdExpanded";

describe("getPostByIdExpanded async works", () => {
  beforeAll(async () => {});

  test("should return null", async () => {
    const comments = await getCommentByIdExpanded(
      "this is a bad id",
      0,
      snoowrapConfigLongDelay
    );
    expect(comments).toBe(null);
  });

  test("parent comment body should be 'Sounds like a win-win to me.'", async () => {
    const comments = await getCommentByIdExpanded(
      "ehdz2uj",
      0,
      snoowrapConfigLongDelay
    );
    expect(comments.body).toBe("Sounds like a win-win to me.");
  });

  test("get correct count when upvotes are negative or < -20", async () => {
    const comments = await getCommentByIdExpanded(
      "ehdz2uj",
      -20,
      snoowrapConfigLongDelay
    );
    expect(comments.count).toBe(11);
  });

  test("get correct count when upvotes are positive or > 0", async () => {
    const comments = await getCommentByIdExpanded(
      "ehdz2uj",
      0,
      snoowrapConfigLongDelay
    );
    expect(comments.count).toBe(9);
  });
});
