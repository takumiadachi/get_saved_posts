import getStoryById from "../../../src/api/hackernews/v0/getStoryById";

describe("getStoryById async works", () => {
  test("should return null", async () => {
    const story = await getStoryById("this is a bad id");
    expect(story).toBe(null);
  });

  test("Should return the correct url", async () => {
    const story = await getStoryById("8863");
    expect(story.url).toBe("http://www.getdropbox.com/u/2/screencast.html");
  });
});
