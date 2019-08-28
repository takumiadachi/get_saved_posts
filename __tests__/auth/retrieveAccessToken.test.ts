import retrieveAccessToken from "../../src/routers/reddit/auth/methods/retrieveAccessToken";

describe("retrieveAccessToken works", () => {
  test("should return something", async () => {
    const token = await retrieveAccessToken("bad token", "bad id");
    expect(token).toBeFalsy();
  });
});
