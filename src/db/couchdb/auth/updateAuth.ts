import nano from "../connect";

/**
 * Update auth details for user
 *
 * dbName is also the _id of auth details
 *
 * @param dbName
 */
export default async function updateAuth(
  dbName: string,
  changes?: { access_token?; refresh_token? }
) {
  try {
    const _id = dbName;
    const db = nano.use(dbName);
    const post = await db.get(_id);
    changes["_rev"] = post._rev;
    console.log(changes);
    // @ts-ignore
    const update = await db.insert(changes, post._id);
    return update;
  } catch (error) {
    // console.log(error.reason);
    return null;
  }
}

(async () => {
  const data = await updateAuth("gre-uniqueid", {
    access_token: "new access_token",
    refresh_token: "new refresH_token"
  });
  console.log(data);
})();
