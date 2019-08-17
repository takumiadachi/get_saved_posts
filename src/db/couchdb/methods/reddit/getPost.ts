import { nano } from "../../connect";
import * as Nano from "nano";
import { TrimmedComment } from "../../../../models/TrimmedComment";

export async function getPost(dbName: string) {
  try {
    const db = nano.use(dbName);
    // const view = await db.view("body_view", "body", { key: "sinus" });
    // console.log(view);
    console.log("test");
    // const view = await db.search("");
    return null;
  } catch (error) {
    return null;
  }
}
