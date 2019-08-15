import { Listing, Submission } from "snoowrap";
import Content from "./Content";
import * as Nano from "nano";
import uuhash from "../db/methods/uuhash";

export class TrimmedSubmission extends Content<TrimmedSubmission>
  implements Nano.MaybeDocument {
  _id: string;
  _rev;
  subreddit: string;
  title: string;
  ups: number;
  username: string;
  // Note: replies should always be last because when it uses a function, the next property will not be saved.
  constructor(subreddit, title, ups, username) {
    super();
    this.subreddit = subreddit;
    this.title = title;
    this.ups = ups;
    this.username = username;
    this._id = uuhash(this.permalink);
  }

  /**
   * An alternative way to create a TrimmedSubmission from reddit's Submission class.
   * @param Submission
   */
  public static fromSubmission(Submission: Submission): TrimmedSubmission {}

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
