export default class Comment {
  by: string;
  id: number;
  parent: number;
  kids: Array<number>;
  score: number;
  text: string;
  created: number;
  title: string;
  type: string; // comment
}
