import { nano } from "../couchdb/index";
import * as Nano from "nano";
import { TrimmedComment } from "../../models/TrimmedComment";

export async function getRedditPost(dbName: string) {
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
