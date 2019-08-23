import nano from "../../connect";
import TrimmedComment from "../../../../models/reddit/TrimmedComment";
import TrimmedSubmission from "../../../../models/reddit/TrimmedSubmission";
import DocumentGetResponse from "nano";

export default async function getPost(dbName: string, _id) {
  try {
    const db = nano.use(dbName);
    const post = await db.get(_id);

    return post;
  } catch (error) {
    console.log(error.reason);
    return null;
  }
}
