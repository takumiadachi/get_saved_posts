import Nano from "nano";

export let nano = Nano("http://localhost:5984");

/**
 * Returns dbName if a db with that name is found else creates one.
 * @param dbName
 */
export async function createUserDB(dbName: string) {
  let info = {};
  // Set to lowercase because CouchDB only accepts lowercase letters.
  dbName = dbName.toLocaleLowerCase();
  try {
    await nano.db.get(dbName);
    info["name"] = dbName;
    return dbName;
  } catch (e) {
    if (e.error === "not_found") {
      const created = await nano.db.create(dbName);
      console.log(created);
      info["created"] = created;
      info["name"] = dbName;
      return info;
    }
    return null;
  }
}
