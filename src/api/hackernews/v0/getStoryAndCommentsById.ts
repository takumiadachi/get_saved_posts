import axios from "axios";
import { HN_API_BASEURL, API_V0 } from "../URL";
import Story from "../../../models/hackernews/Story";

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
    const root = Story.fromStory(response.data);
    const promises = await root.kids.map(async id => {
      const response = await axios.get(
        `${HN_API_BASEURL}/${API_V0}/item/${id}.json?print=pretty`
      );
      const story = Story.fromStory(response.data);
      return story;
    });
    const all = await Promise.all(promises);
    return all;
  } catch (error) {
    console.log(error);
    return null;
  }
}

(async () => {
  const data = await getStoryAndCommentsById("8863");
  console.log(data);
})();
