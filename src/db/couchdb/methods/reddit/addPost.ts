import { nano } from "../../connect";
import { TrimmedComment } from "../../../../models/TrimmedComment";

export async function addPost(dbName: string, post: TrimmedComment) {
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
