import { nano } from "../couchdb/index";
import { TrimmedComment } from "../../models/TrimmedComment";

export async function addRedditPost(dbName: string, post: TrimmedComment) {
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