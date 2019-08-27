import Item from "./Item";

export default class Comment implements Item {
  by: string;
  id: number;
  kids: Array<number>;
  parent: number;
  text: string;
  time: number; // created
  type: string; // comment

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
}
