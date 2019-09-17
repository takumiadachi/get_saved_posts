import nano from "../../connect";
import APIError from "./interfaces/APIError";

export default async function getRedditPost(dbName: string, _id) {
  try {
    const db = nano.use(dbName);
    const post = await db.get(_id);
    return post;
  } catch (error) {
    const err: APIError = { return: null, reason: error.reason };
    return err;
  }
}
