import axios from "axios";
import Comment from "../../../models/hackernews/Comment";
import { HN_API_BASEURL, API_V0 } from "../URL";
import Story from "src/models/hackernews/Story";

const fs = require("fs");

/**
 * Get a HN story. Similar to a Reddit submission
 *
 * Has top level comments and by default 1 level depth/deep.
 *
 * Example output if id was 8863
 *
 * @param id
 */
export default async function getStoryAndCommentsById(
  id: string,
  depth: number = 1
) {
  try {
    function deep(depth = 1) {}
    const response = await axios.get(
      `${HN_API_BASEURL}/${API_V0}/item/${id}.json?print=pretty`
    );
    const story = Story.fromStory(response.data);
    const promises = await story.kids.map(async id => {
      const response = await axios.get(
        `${HN_API_BASEURL}/${API_V0}/item/${id}.json?print=pretty`
      );
      const comment = Comment.fromComment(response.data);
      return comment;
    });
    const comments = await Promise.all(promises);
    story.setComments(comments);
    return story;
  } catch (error) {
    console.log(error);
    return null;
  }
}

(async () => {
  const data = await getStoryAndCommentsById("8863");
  const json = JSON.stringify(data);
  fs.writeFile("reddit_me.json", json, (err, result) => {
    if (err) console.log("error", err);
  });
  console.log(data);
})();
