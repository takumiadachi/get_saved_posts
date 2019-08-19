import { nano } from "../connect";
import * as Nano from "nano";
import { TrimmedComment } from "../../../models/reddit/TrimmedComment";

export async function addDesignDoc(dbName: string) {
  try {
    // const db = nano.use(dbName);

    const db = await nano.use("design_query");
    // console.log(createDb, useDb);

    // console.log(view);
    return null;
  } catch (error) {
    return null;
  }
}
