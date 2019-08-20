import { nano } from "../../connect";
import * as Nano from "nano";
import { TrimmedSubmission } from "../../../../models/reddit/TrimmedSubmission";
import { TrimmedComment } from "../../../../models/reddit/TrimmedComment";

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
      all_submissions: {
        map: function(doc) {
          // @ts-ignore
          if (doc.title) {
            emit(doc.title);
          }
          // @ts-ignore
          if (doc.body) {
            emit(doc.body);
          }
        }
      }
    };
  }
}
