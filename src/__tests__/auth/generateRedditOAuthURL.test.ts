import generateRedditOAuthURL from "@src/routers/reddit/auth/methods/generateRedditOAuthURL";

describe("generateRedditOAuthURL works", () => {
  test("should return something", async () => {
    const url = generateRedditOAuthURL("this is the state");
    expect(url).toBeTruthy;
  });
});
