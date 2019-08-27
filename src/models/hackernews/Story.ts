export default class Story {
  by: string;
  id: number;
  kids: Array<number>;
  score: number;
  created: number;
  title: string;
  type: string; // story
  url: string;

  constructor(by, id, kids, score, created, title, type, url) {
    this.by = by;
    this.id = id;
    this.kids = kids;
    this.score = score;
    this.created = created;
    this.title = title;
    this.type = type;
    this.url = url;
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
}
