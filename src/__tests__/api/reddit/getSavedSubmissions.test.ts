import {
  snoowrapConfig,
  snoowrapConfigLongDelay
} from "@src/config/reddit/config";
import getSavedSubmissions from "../../../api/reddit/v1/user/getSavedSubmissions";

describe("getPostByIdExpanded async works", () => {
  beforeAll(async () => {});

  test("should return an empty array", async () => {
    const submissions = await getSavedSubmissions(
      "this is a bad search string",
      snoowrapConfigLongDelay
    );
    expect(submissions).toEqual(expect.anything());
  }, 20000); // Jest.timeout defaults to 5000, so set it to 10000 for more time

  test("should get a couple of saved submissions", async () => {
    const submissions = await getSavedSubmissions(
      "crush",
      snoowrapConfigLongDelay
    );
    expect(submissions).toEqual(expect.anything());
  }, 60000);
});
