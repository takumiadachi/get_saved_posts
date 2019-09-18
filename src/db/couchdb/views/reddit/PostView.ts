import * as Nano from "nano";
import TrimmedComment from "@src/models/reddit/TrimmedComment";
import TrimmedSubmission from "@src/models/reddit/TrimmedSubmission";

/**
 * CouchDB Views for TrimmedComments and TrimmedSubmissions
 *
 */
export default class PostView
  implements Nano.ViewDocument<TrimmedComment & TrimmedSubmission> {
  _id: string;
  // Use any so that emit works for now.
  views: { [name: string]: Nano.View<TrimmedComment & TrimmedSubmission> };
  constructor() {
    this.views = {
      all: {
        map: function(doc) {
          // @ts-ignore
          emit(doc._id, doc.title);
        }
      }
    };
  }
}
