import refreshToken from "../../routers/reddit/auth/methods/refreshToken";

describe("refreshToken works", () => {
  test("should return something", async () => {
    const token = await refreshToken("bad token");
    expect(token).toBeFalsy();
  });
});
