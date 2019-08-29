import revokeToken from "../../src/routers/reddit/auth/methods/revokeToken";

describe("revokeToken works", () => {
  test("should throw an error about tokenType", async () => {
    const token = await revokeToken("bad token", "bad token type");
    expect(token).toThrow();
  });

  test("should return null", async () => {
    const token = await revokeToken("bad token", "access_token");
    expect(token).toBeFalsy();
  });
});
