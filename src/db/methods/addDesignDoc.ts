import { nano } from "../couchdb/index";
import * as Nano from "nano";
import { TrimmedComment } from "../../models/TrimmedComment";

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
  // views: any;
  constructor() {
    this.views = {
      ups: {
        map: function(doc) {
          // if (doc.ups > 0) {
          // Ignore until this gets fixed by couchdb-nano devs
          // @ts-ignore
          emit(doc.body, doc.ups, doc._id);
          // }
        }
      }
      // search_body: {
      //   map: doc => {
      //     // Check if lowercase uppercase matters.
      //     if (doc.body.indexOf(doc.value)) {
      //       // Value is the search term
      //       emit(doc.ups, doc.body, doc.created, doc.permalink);
      //     }
      //   }
      // }
    };
  }
}

(async () => {
  const db = await nano.use("uniqueuser");
  // const newView = await new PostView();
  // const insertDesign = await db.insert(newView, "_design/posts");
  const tryView = await db.view("posts", "ups");
  console.log(tryView);
  // console.log(tryView.rows[0].value);
  // const view = await db.view("body_view", "body", { key: "sinus" });
  // const useView = db.view();
  await addDesignDoc("uniqueuser");
})();
