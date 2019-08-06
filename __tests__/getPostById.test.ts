import getPostById from "../src/api/reddit/v1/getPostById";

describe("getPostById async works", () => {
  beforeAll(async () => {});

  test("should return null", async () => {
    const data = await getPostById("this is a bad id");
    expect(data).toBe(null);
  });

  test("comment body should contain 'sinus infection'", async () => {
    const data = await getPostById("evkxj13");
    expect(data.body).toContain("sinus infection");
  });
});
