import revokeToken from "../../src/routers/reddit/auth/methods/revokeToken";

describe("revokeToken works", () => {
  test("should return something", async () => {
    const token = await revokeToken("bad token", "bad token type");
    expect(token).toBeFalsy();
  });
});
