import { Listing, Comment, RedditUser } from "snoowrap";
import Content from "./Content";
import * as Nano from "nano";
import uuhash from "../../db/couchdb/methods/uuhash";
import moment from "moment";
import { isNumber } from "lodash";

export default class TrimmedComment extends Content<TrimmedComment>
  implements Nano.MaybeDocument {
  _id: string;
  _rev: string;
  type: string;
  ups: number;
  body: string;
  created: string;
  permalink: string;
  author: string;
  parent_id: string;
  replies?: Listing<Comment> | TrimmedComment[]; // Note: replies should always be last

  // Note: replies should always be last because when it uses a function, the next property will not be saved.
  constructor(
    comment_id: string,
    ups: number,
    body: string,
    created: number,
    permalink: string,
    author: string,
    parent_id: string,
    replies
  ) {
    super();
    this._id = comment_id;
    this.type = "comment";
    this.ups = ups;
    this.body = body;
    this.created = isNumber(created)
      ? moment.unix(created).format("DD-MM-YYYY h:mm:ss")
      : created;
    this.permalink = permalink;
    this.author = author;
    this.parent_id = parent_id;
    this.replies = replies;
  }

  public static fromComment(comm: Comment, func?: Function): TrimmedComment {
    return new TrimmedComment(
      comm.id,
      comm.ups,
      comm.body,
      comm.created,
      comm.permalink,
      comm.author.name,
      comm.parent_id,
      comm.replies
    );
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

  getId() {
    return this._id;
  }

  getRev() {
    return this._rev;
  }
}
