import getSavedSubmissions from "../src/api/reddit/v1/user/getSavedSubmissions";

describe("getPostByIdExpanded async works", () => {
  beforeAll(async () => {});

  test("should return an empty array", async () => {
    const submissions = await getSavedSubmissions(
      "this is a bad search string"
    );
    expect(submissions).toEqual(expect.anything());
  }, 10000); // Jest.timeout defaults to 5000, so set it to 10000 for more time

  test("should get a couple of saved submissions", async () => {
    const submissions = await getSavedSubmissions("crush");
    expect(submissions).toEqual(expect.anything());
  }, 60000);
});
