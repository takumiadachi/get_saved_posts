import { nano } from "../../connect";
import { TrimmedComment } from "../../../../models/reddit/TrimmedComment";
import { TrimmedSubmission } from "../../../../models/reddit/TrimmedSubmission";

export async function getPost(dbName: string, _id) {
  try {
    const db = nano.use(dbName);
    // const uuid = await await nano.uuids(1);
    const aView = await db.view("post_view", "all", {
      key: _id,
      include_docs: true
    });
    return aView;
  } catch (error) {
    console.log(error.reason);
    return null;
  }
}
