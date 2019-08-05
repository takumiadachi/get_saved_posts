import { Listing } from "snoowrap";
import Content from "./Content";

export class TrimmedComment extends Content<TrimmedComment> {
  ups: number;
  body: string;
  created?: number;
  permalink?: string;
  replies?: Listing<Comment> | TrimmedComment[]; // Note: replies should always be last

  // Note: replies should always be last because when it uses a function, the next property will not be saved.
  constructor(ups, body, created = null, permalink = null, replies = null) {
    super();

    this.created = created;
    this.ups = ups;
    this.body = body;
    this.permalink = permalink;
    this.replies = replies;
  }
}
