import getSavedSubmissions from "../src/api/v1/getSavedSubmissions";

describe("getPostByIdExpanded async works", () => {
  beforeAll(async () => {});

  test("should return an empty array", async () => {
    const data = await getSavedSubmissions("this is a bad search string");
    expect(data).toEqual(expect.anything());
  }, 10000); // Jest.timeout defaults to 5000, so set it to 10000 for more time

  test("should get a couple of saved submissions", async () => {
    const data = await getSavedSubmissions("crush");
    expect(data).toEqual(expect.anything());
  }, 10000);
});
