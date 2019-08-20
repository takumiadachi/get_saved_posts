import { Submission, RedditUser, Subreddit } from "snoowrap";
import Content from "./Content";
import * as Nano from "nano";
import uuhash from "../../db/couchdb/methods/uuhash";
import moment from "moment";
import { TrimmedComment } from "./TrimmedComment";

export class TrimmedSubmission extends Content<TrimmedSubmission>
  implements Nano.MaybeDocument {
  _id: string;
  _rev;
  type: string;
  subreddit: string;
  title: string;
  selftext: string;
  ups: number;
  author: string;
  over_18: boolean;
  rId: string; // reddit submission id
  created: string;
  permalink: string;
  comments: Array<TrimmedComment>;

  // Note: replies should always be last because when it uses a function, the next property will not be saved.
  constructor(
    submission_id,
    subreddit: Subreddit,
    title,
    selftext,
    ups,
    author: RedditUser,
    over_18,
    rId,
    created,
    permalink
  ) {
    super();
    this._id = submission_id;
    this.subreddit = subreddit.display_name;
    this.type = "submission";
    this.title = title;
    this.selftext = selftext;
    this.ups = ups;
    this.author = author.name;
    this.over_18 = over_18;
    this.rId = rId;
    this.created = moment.unix(created).format("DD-MM-YYYY h:mm:ss");
    this.permalink = permalink;
  }

  /**
   * An alternative way to create a TrimmedSubmission from reddit's Submission class.
   * @param Submission
   */
  public static fromSubmission(sub: Submission): TrimmedSubmission {
    return new TrimmedSubmission(
      sub.id,
      sub.subreddit,
      sub.title,
      sub.selftext,
      sub.ups,
      sub.author,
      sub.over_18,
      sub.id,
      sub.created,
      sub.permalink
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
