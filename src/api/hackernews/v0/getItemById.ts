import axios from "axios";
import { HN_API_BASEURL, API_V0 } from "../URL";
import Story from "../../../models/hackernews/Story";
import Comment from "../../../models/hackernews/Comment";

/**
 * Returns a Hacker news Story or Comment
 *
 * An item can be either a Story or Comment
 *
 * @param id
 */
export default async function getItemById(
  id: string
): Promise<Comment | Story> {
  try {
    const response = await axios.get(
      `${HN_API_BASEURL}/${API_V0}/item/${id}.json`
    );
    if (response.data["type"] === "story") {
      const story = Story.fromStory(response.data);
      return story;
    }
    if (response.data["type"] === "comment") {
      const comment = Comment.fromComment(response.data);
      return comment;
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
