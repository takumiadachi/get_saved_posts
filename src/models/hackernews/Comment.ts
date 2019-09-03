import Item from "./Item";
import Nano from "nano";

export default class Comment implements Item {
  _id: string;
  _rev: string;
  by: string;
  id: number;
  kids: Array<number>;
  parent: number;
  text: string;
  time: number; // created
  type: string; // comment
  comments: Comment[];

  deleted: boolean;
  dead: boolean;
  url: string;
  score: number;
  title: string;
  descendants: number;

  constructor(by, id, kids, parent, text, time, type) {
    this.by = by;
    this.id = id;
    this.kids = kids;
    this.parent = parent;
    this.text = text;
    this.time = time;
    this.type = type;
  }

  /**
   * Generate a Comment straight from a comment provided by HN.
   *
   * @param story
   * @param func
   */
  public static fromComment(comment, func?: Function): Comment {
    return new Comment(
      comment["by"],
      comment["id"],
      comment["kids"],
      comment["parent"],
      comment["text"],
      comment["time"],
      comment["type"]
    );
  }

  setComments(comments: Comment[]) {
    this.comments = comments;
  }

  getComments() {
    return this.comments;
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
