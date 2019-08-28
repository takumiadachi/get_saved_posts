import nano from "../connect";
import * as Nano from "nano";

/**
 * Add a view.
 *
 * viewName example: "_design/post_view"
 *
 * @param dbName
 * @param view
 * @param viewName
 */
export default async function addView(
  dbName: string,
  view: Nano.ViewDocument<any>,
  viewName: string
) {
  try {
    const db = await nano.use(dbName);
    const insertView = await db.insert(view, viewName);

    return insertView;
  } catch (error) {
    return null;
  }
}
