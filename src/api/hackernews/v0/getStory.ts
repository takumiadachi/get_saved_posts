import axios from "axios";
import { HN_API_BASEURL, API_V0 } from "../URL";

export default async function getStory(id: string) {
  try {
    console.log(`${HN_API_BASEURL}/${API_V0}/item/${id}.json?print=pretty`);
    const response = await axios.get(
      `${HN_API_BASEURL}/${API_V0}/item/${id}.json?print=pretty`
    );
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}

(async () => {
  const response = await getStory("8863");
  console.log(response.data);
})();
