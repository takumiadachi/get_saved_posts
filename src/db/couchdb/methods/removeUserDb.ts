import { nano } from "../connect";
/**
 * Destroys/removes couchdb db with dbName. Returns dbName if successful else returns null.
 * @param dbName
 */
export async function removeUserDb(dbName: string) {
  let info = {};
  // Set to lowercase because CouchDB only accepts lowercase letters.
  dbName = dbName.toLocaleLowerCase();
  try {
    await nano.db.get(dbName);
    const destroyed = await nano.db.destroy(dbName);
    info["destroyed"] = destroyed.ok;
    info["name"] = dbName;
    return info;
  } catch (e) {
    if (e.error === "not_found") {
      return null;
    }
    return null;
  }
}
