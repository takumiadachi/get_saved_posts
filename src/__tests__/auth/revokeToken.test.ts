import revokeToken from "@src/routers/reddit/auth/methods/revokeToken";

describe("revokeToken works", () => {
  test("should throw an error about tokenType", async () => {
    // const token = await revokeToken("bad token", "bad token type");
    expect(revokeToken("bad token", "bad token type")).rejects.toThrow();
  });

  test("should return a 204 (success) even if token was never valid", async () => {
    const token = await revokeToken("bad token", "access_token");
    expect(token.status).toBe(204);
  });

  test("should also return a 204 (success) even if token was never valid", async () => {
    const test = await revokeToken(
      "290425859781-TI9i94mtnz_dS5o5",
      "refresh_token"
    );
    expect(test.status).toBe(204);
  }, 60000);
});
