import getItemById from "../../../api/hackernews/v0/getItemById";

describe("getitemById async works", () => {
  test("should return null", async () => {
    const story = await getItemById("this is a bad id");
    expect(story).toBe(null);
  });

  test("should return a story", async () => {
    const story = await getItemById("8863");
    expect(story.type).toBe("story");
  });

  test("should return a comment", async () => {
    const comment = await getItemById("2921983");
    expect(comment.type).toBe("comment");
  });

  test("Should return the correct url", async () => {
    const story = await getItemById("8863");
    expect(story.url).toBe("http://www.getdropbox.com/u/2/screencast.html");
  });
});
