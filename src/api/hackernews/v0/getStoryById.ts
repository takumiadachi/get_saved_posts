import axios from "axios";
import { HN_API_BASEURL, API_V0 } from "../URL";
import Story from "../../../models/hackernews/Story";

/**
 * Get a HN story. Similar to a Reddit submission
 *
 * Does not have comments
 *
 * Example output if id was 8863
 *
 * {
 *  "by" : "dhouston",
 *   "descendants" : 71,
 *   "id" : 8863,
 *   "kids" : [ 8952, 9224, 8917, 8884... ],
 *   "score" : 111,
 *   "time" : 1175714200,
 *   "title" : "My YC app: Dropbox - Throw away your USB drive",
 *   "type" : "story",
 *   "url" : "http://www.getdropbox.com/u/2/screencast.html"
 * }
 *
 * @param id
 */
export default async function getStoryById(id: string): Promise<Story> {
  try {
    const response = await axios.get(
      `${HN_API_BASEURL}/${API_V0}/item/${id}.json?print=pretty`
    );
    const story = Story.fromStory(response.data);
    return story;
  } catch (error) {
    console.log(error);
    return null;
  }
}
