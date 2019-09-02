import Comment from "src/models/hackernews/Comment";
import Story from "src/models/hackernews/Story";
import nano from "../../connect";
import { MaybeDocument } from "nano";

export default async function addHNPost(
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
  const addedHNPost = await addHNPost("AskReddit", "index#");
  console.log(addedHNPost);
})();
