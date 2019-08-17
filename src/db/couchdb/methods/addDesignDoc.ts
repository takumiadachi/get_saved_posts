import { nano } from "../connect";
import * as Nano from "nano";
import { TrimmedComment } from "../../../models/TrimmedComment";

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

class PostView implements Nano.ViewDocument<TrimmedComment> {
  _id: string;
  views: { [name: string]: Nano.View<TrimmedComment> };
  constructor() {
    // Does not like ES6 => arrows, use function(doc) {}
    this.views = {
      all: {
        map: function(doc) {
          if (doc.body && doc.ups) {
            // ts-ignore until a solution is found
            // Emit is key/value
            // @ts-ignore
            emit(doc.permalink, {
              body: doc.body,
              ups: doc.ups,
              replies: doc.replies
            });
          }
        }
      }
    };
  }
}

(async () => {
  const db = await nano.use("uniqueuser");
  const getView = await db.get("_design/posts", { revs_info: true });
  const lastRevView = getView._rev;
  // console.log(getView._rev);
  const destroyDesign = await db.destroy("_design/posts", getView._rev);
  const newView = await new PostView();
  const insertDesign = await db.insert(newView, "_design/posts");
  const tryView = await db.view("posts", "all", {
    key: "/r/Fitness/comments/ck6f4v/rant_wednesday/evkxj14/"
  });
  console.log(tryView.rows);
  // console.log(tryView.rows[0].value);
  // const view = await db.view("body_view", "body", { key: "sinus" });
  // const useView = db.view();
  // await addDesignDoc("uniqueuser");
})();
