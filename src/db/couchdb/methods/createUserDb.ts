import nano from "../connect";
/**
 * Finds db or creates couch db with dbName if it doesn't exist. Returns dbName if successful.
 * @param dbName
 */
export default async function createUserDb(dbName: string) {
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
      info["created"] = created.ok;
      info["name"] = dbName;
      return info;
    }
    return null;
  }
}
