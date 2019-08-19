import { Listing, Comment, RedditUser } from "snoowrap";
import Content from "./Content";
import * as Nano from "nano";
import uuhash from "../../db/couchdb/methods/uuhash";
import moment from "moment";

export class TrimmedComment extends Content<TrimmedComment>
  implements Nano.MaybeDocument {
  _id: string;
  _rev;
  type: string;
  ups: number;
  body: string;
  created: string;
  permalink: string;
  author: string;
  replies?: Listing<Comment> | TrimmedComment[]; // Note: replies should always be last

  // Note: replies should always be last because when it uses a function, the next property will not be saved.
  constructor(
    ups: number,
    body: string,
    created: number,
    permalink: string,
    author: RedditUser,
    replies
  ) {
    super();
    this._id = uuhash(permalink);
    this.type = "comment";
    this.ups = ups;
    this.body = body;
    this.created = moment.unix(created).format("DD-MM-YYYY h:mm:ss");
    this.permalink = permalink;
    this.author = author.name;
    this.replies = replies;
  }

  public static fromComment(comm: Comment): TrimmedComment {
    return new TrimmedComment(
      comm.ups,
      comm.body,
      comm.created,
      comm.permalink,
      comm.author,
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
}
