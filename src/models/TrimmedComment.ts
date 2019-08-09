import { Listing } from "snoowrap";
import Content from "./Content";
import * as Nano from "nano";

export class TrimmedComment extends Content<TrimmedComment>
  implements Nano.MaybeDocument {
  _id: string;
  _rev;
  ups: number;
  body: string;
  created?: number | string;
  permalink?: string;
  replies?: Listing<Comment> | TrimmedComment[]; // Note: replies should always be last

  // Note: replies should always be last because when it uses a function, the next property will not be saved.
  constructor(
    ups: number,
    body: string,
    created = null,
    permalink: string = null,
    replies = null
  ) {
    super();
    this._id = undefined;
    this._rev = undefined;
    this.created = created;
    this.ups = ups;
    this.body = body;
    this.permalink = permalink;
    this.replies = replies;
  }

  processAPIResponse(response: Nano.DocumentInsertResponse) {
    if (response.ok === true) {
      this._id = response.id;
      this._rev = response.rev;
    }
  }
}
