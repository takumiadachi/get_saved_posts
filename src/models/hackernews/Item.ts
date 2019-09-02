import Nano from "nano";

interface Item extends Nano.MaybeDocument {
  _id: string;
  _rev: string;
  id: number;
  deleted: boolean;
  type: string;
  by: string;
  time: number;
  text: string;
  dead: boolean;
  parent: number;
  kids: Array<number>;
  url: string;
  score: number;
  title: string;
  descendants: number; // total comment count

  //poll uninmplemented
}

export default Item;
