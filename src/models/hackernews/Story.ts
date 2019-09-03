import Item from "./Item";
import Comment from "./Comment";
import Nano from "nano";

export default class Story implements Item {
  _id: string;
  _rev: string;
  by: string;
  id: number;
  kids: Array<number>;
  score: number;
  created: number;
  title: string;
  type: string; // story
  url: string;
  comments: Comment[];

  deleted: boolean;
  time: number;
  text: string;
  dead: boolean;
  parent: number;
  descendants: number;

  constructor(
    by: string,
    id: number,
    kids: number[],
    score: number,
    created: number,
    title: string,
    type: string,
    url: string
  ) {
    this._id = id.toString();
    this.by = by;
    this.id = id;
    this.kids = kids;
    this.score = score;
    this.created = created;
    this.title = title;
    this.type = type;
    this.url = url;
  }

  setComments(comments: Comment[]) {
    this.comments = comments;
  }

  getComments() {
    return this.comments;
  }

  /**
   * Generate a Story straight from a story provided by HN.
   *
   * @param story
   * @param func
   */
  public static fromStory(story, func?: Function): Story {
    return new Story(
      story["by"],
      story["id"],
      story["kids"],
      story["score"],
      story["created"],
      story["title"],
      story["type"],
      story["url"]
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
