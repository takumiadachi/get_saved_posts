import { Listing } from "snoowrap";

export class TrimmedComment implements TrimmedComment {
  ups: number;
  body: string;
  created?: number;
  replies?: Listing<Comment> | TrimmedComment[];

  constructor(ups, body, created, replies = null) {
    this.created = created;
    this.ups = ups;
    this.body = body;
    this.replies = replies;
  }
}

export interface TrimmedComment {
  ups: number;
  body: string;
  created?: number;
  replies?: Listing<Comment> | TrimmedComment[];
}
