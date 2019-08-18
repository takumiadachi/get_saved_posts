import { nano } from "../../connect";
import * as Nano from "nano";
import { TrimmedSubmission } from "../../../../models/TrimmedSubmission";
import { TrimmedComment } from "../../../../models/TrimmedComment";

/**
 * CouchDB Views for TrimmedComments and TrimmedSubmissions
 *
 */
export default class PostView
  implements Nano.ViewDocument<TrimmedComment | TrimmedSubmission> {
  _id: string;
  // Use any so that emit works for now.
  views: { [name: string]: Nano.View<TrimmedComment | TrimmedSubmission> };
  constructor() {
    this.views = {
      all: {
        map: function(doc) {
          // @ts-ignore
          emit(doc.permalink, doc);
        }
      }
    };
  }
}
