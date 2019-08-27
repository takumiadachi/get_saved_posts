import axios from "axios";
import { HN_API_BASEURL, API_V0 } from "../URL";

/**
 * Get a HN story. Similar to a Reddit submission
 *
 * Has top level comments and by default 1 level depth/deep.
 *
 * Example output if id was 8863
 *
 * @param id
 */
export default async function getStoryByIdAndComments(
  id: string,
  depth: number = 1
) {
  try {
    function deep(depth = 1) {}
    const response = await axios.get(
      `${HN_API_BASEURL}/${API_V0}/item/${id}.json?print=pretty`
    );
    const root = response.data;
    // for (child: number of root['kids'])

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}
