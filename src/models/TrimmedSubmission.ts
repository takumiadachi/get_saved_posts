import { Listing } from "snoowrap";
import Content from "./Content";
import * as Nano from "nano";
import uuhash from "../db/methods/uuhash";

export class TrimmedComment extends Content<TrimmedComment>
  implements Nano.MaybeDocument {
  _id: string;
  _rev;

  // Note: replies should always be last because when it uses a function, the next property will not be saved.
  constructor() {
    // this._id = uuhash(this.permalink);
  }

  processAPIResponse(response: Nano.DocumentInsertResponse) {
    if (response.ok === true) {
      // if (this.permalink) {
      //   this._id = uuhash(this.permalink);
      //   // console.log(this._id);
      // } else {
      //   this._id = response.id; //
      // }
      // We only need to update rev which changes whenever document is updated
      this._rev = response.rev;
    }
  }
}
