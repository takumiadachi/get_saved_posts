import { nano } from "../couchdb/index";
import * as Nano from "nano";

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

class ResidenceView implements Nano.ViewDocument<Residence> {
  _id: string;
  views: { [name: string]: Nano.View<Residence> };
  constructor() {
    this.views = {
      by_city: {
        map: doc => {
          emit([doc.name, doc.city], doc._id);
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
  const insertDesign = await db.insert(newView);
  const view = await db.view("body_view", "body", { key: "sinus" });
  await addDesignDoc("uniqueuser");
})();
