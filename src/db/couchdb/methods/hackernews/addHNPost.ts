import Comment from "src/models/hackernews/Comment";
import Story from "src/models/hackernews/Story";
import nano from "../../connect";
import Item from "src/models/hackernews/Item";

export default async function addHNPost(
  dbName: string,
  post: Item | Story | Comment
) {
  try {
    const db = nano.use(dbName);
    // const uuid = await await nano.uuids(1);
    const inserted = await db.insert(post);
    post.processAPIResponse(inserted);
    return post;
  } catch (error) {
    console.log(error.reason);
    return null;
  }
}
