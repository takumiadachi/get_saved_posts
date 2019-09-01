import nano from "../../connect";
import TrimmedComment from "../../../../models/reddit/TrimmedComment";
import TrimmedSubmission from "../../../../models/reddit/TrimmedSubmission";

export default async function addRedditPost(
  dbName: string,
  post: TrimmedComment | TrimmedSubmission
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
