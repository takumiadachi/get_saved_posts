import getCommentByIdExpanded from "../../../api/reddit/v1/getCommentByIdExpanded";

describe("getPostByIdExpanded async works", () => {
  beforeAll(async () => {});

  test("should return null", async () => {
    const comments = await getCommentByIdExpanded("this is a bad id", 0);
    expect(comments).toBe(null);
  });

  test("parent comment body should be 'Sounds like a win-win to me.'", async () => {
    const comments = await getCommentByIdExpanded("ehdz2uj");
    expect(comments.body).toBe("Sounds like a win-win to me.");
  });

  test("get correct count when upvotes are negative or < -20", async () => {
    const comments = await getCommentByIdExpanded("ehdz2uj", -20);
    expect(comments.count).toBe(11);
  });

  test("get correct count when upvotes are positive or > 0", async () => {
    const comments = await getCommentByIdExpanded("ehdz2uj", 0);
    expect(comments.count).toBe(9);
  });
});
