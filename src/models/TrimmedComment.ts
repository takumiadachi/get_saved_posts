import { Listing } from "snoowrap";
import Content from "./Content";

export class TrimmedComment extends Content<TrimmedComment> {
  ups: number;
  body: string;
  created?: number;
  replies?: Listing<Comment> | TrimmedComment[];

  constructor(ups, body, created, replies = null) {
    super();

    this.created = created;
    this.ups = ups;
    this.body = body;
    this.replies = replies;
  }
}
