import permalinkToId from "@src/api/reddit/helpers/permalinkToId";

describe("permalinkToId works", () => {
  beforeAll(async () => {});

  test("should return both a submissionId and commentId", () => {
    const url =
      "https://www.reddit.com/r/AskReddit/comments/cr6q08/do_kids_in_us_schools_really_dissect_frogs_in/ex272rc?utm_source=share&utm_medium=web2x";
    const data = permalinkToId(url);
    expect(data.submissionId).toContain("cr6q08");
    expect(data.commentId).toContain("ex272rc");
  }, 10000); // Jest.timeout defaults to 5000, so set it to 10000 for more time

  test("should return only a submissionId", async () => {
    const url =
      "https://www.reddit.com/r/nba/comments/ctflsw/disappointed_melo/";
    const data = permalinkToId(url);
    expect(data.submissionId).toContain("ctflsw");
    expect(data.commentId).toBe(null);
  }, 10000);
});
