import { nano } from "../couchdb/index";
import * as Nano from "nano";
import { EventEmitter } from "events";
import { emit } from "cluster";

export async function addDesignDoc(dbName: string) {
  try {
    // const db = nano.use(dbName);

    const db = await nano.use("design_query");
    // console.log(createDb, useDb);

    // console.log(view);
    return null;
  } catch (error) {
    return null;
  }
}

class Residence implements Nano.Document {
  _id: string;
  _rev: string;
  name: string;
  city: string;

  constructor(name, city) {
    this.name = name;
    this.city = city;
  }

  processAPIResponse(response: Nano.DocumentInsertResponse) {
    if (response.ok === true) {
      this._id = response.id; //
      this._rev = response.rev;
    }
  }
}
// "function(doc) { console.log(doc); emit([doc.name, doc.city], doc); }"
class ResidenceView implements Nano.ViewDocument<Residence> {
  _id: string;
  views: any; // FIGURE OUT THIS TYPE
  constructor() {
    this.views = {
      all: {
        map: doc => {
          emit(doc.name, doc._id);
        }
      }
    };
  }
}

(async () => {
  // const createDb = await nano.db.create("design_query");
  // console.log(createDb);
  const db = await nano.use("design_query");
  // await db.insert(new Residence("Jule", "Shenzhen"));
  // await db.insert(new Residence("Ange", "Fukuoka"));
  // await db.insert(new Residence("Shelly", "Macao"));
  const newView = await new ResidenceView();
  // const insertDesign = await db.insert(newView, "_design/people");
  const tryView = await db.view("people", "all", {
    key: "Jule"
  });
  console.log(tryView.rows[0].value);
  // const view = await db.view("body_view", "body", { key: "sinus" });
  // const useView = db.view();
  await addDesignDoc("uniqueuser");
})();
