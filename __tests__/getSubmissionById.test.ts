import getSubmissionById from "../src/api/reddit/v1/getSubmissionById";

describe("getSubmissionById async works", () => {
  beforeAll(async () => {});

  test("should return null", async () => {
    const submission = await getSubmissionById("this is a bad id");
    expect(submission).toBe(null);
  }, 10000); // Jest.timeout defaults to 5000, so set it to 10000 for more time

  test("should show a submission from /r/nba about DeMarcus Cousins injury", async () => {
    const submission = await getSubmissionById("cqwbyt");
    // console.log(submission);
    console.log(submission.title);
    expect(submission.title).toContain("DeMarcus Cousins");
  }, 10000);
});
