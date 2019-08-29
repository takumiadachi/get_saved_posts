import nano from "../connect";

/**
 * Get auth details.
 *
 * Use session Id as dbName.
 *
 * Each sessionID corresponds to a user and their auth details.
 *
 * @param dbName
 */
export default async function getAuth(dbName: string) {
  try {
    const db = nano.use(dbName);
    const details = await db.get(dbName);
    return details;
  } catch (error) {
    // console.log(error.reason);
    return null;
  }
}
