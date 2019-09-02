import Comment from "../../../../models/hackernews/Comment";
import Story from "src/models/hackernews/Story";
import nano from "../../connect";
import { MaybeDocument } from "nano";
import getStoryAndCommentsById from "src/api/hackernews/v0/getStoryAndCommentsById";

export default async function getHNPost(
  dbName: string,
  item: Story & Comment & MaybeDocument
) {
  try {
    const db = nano.use(dbName);
    const inserted = await db.insert(item);
    item.processAPIResponse(inserted);
    return item;
  } catch (error) {
    console.log(error.reason);
    return null;
  }
}

(async () => {
  const story = await getStoryAndCommentsById("20857887");
  const gotHNPost = await getHNPost("gre-uniqueid", story);
  console.log(gotHNPost);
})();
