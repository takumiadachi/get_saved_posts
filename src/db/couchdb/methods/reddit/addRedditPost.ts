import nano from "../../connect";
import TrimmedComment from "../../../../models/reddit/TrimmedComment";
import TrimmedSubmission from "../../../../models/reddit/TrimmedSubmission";
import APIError from "./interfaces/APIError";

export default async function addRedditPost(
  dbName: string,
  post: TrimmedComment | TrimmedSubmission
) {
  try {
    const db = nano.use(dbName);
    const inserted = await db.insert(post);
    post.processAPIResponse(inserted);
    return post;
  } catch (error) {
    const err: APIError = { return: null, reason: error.reason };
    return err;
  }
}
