import getPostById from "../src/api/getPostById";

describe("getPostById async works", () => {
  beforeAll(async () => {});

  test("should return null", async () => {
    const data = await getPostById("this is a bad id");
    expect(data).toBe(null);
  });

  test("comment body should containt 'sinus infection'", async () => {
    const data = await getPostById("ehdz2uj");
    expect(data.body).toContain("sinus infection");
  });
});
