import nano from "../connect";
import _ from "lodash";
import revokeToken from "../../../routers/reddit/auth/methods/revokeToken";

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
    const oldAuthDetails = await db.get(_id);
    // Revoke old tokens
    console.log(changes);
    if (changes.access_token) {
      const revoked = await revokeToken(
        oldAuthDetails["access_token"],
        "access_token"
      );
      console.log(revoked.status);
    }
    if (changes.refresh_token) {
      const revoked = await revokeToken(
        oldAuthDetails["refresh_token"],
        "refresh_token"
      );
      console.log(revoked.status);
    }
    changes["_rev"] = oldAuthDetails._rev; // Set the rev properly so couchDb can increment it.
    const mergedChanges = _.extend(oldAuthDetails, changes);
    // @ts-ignore
    const update = await db.insert(mergedChanges, _id);
    return update;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// (async () => {
//   const data = await updateAuth("gre-uniqueid", {
//     access_token: "new access_token",
//     refresh_token: "new refresH_token"
//   });
//   console.log(data);
// })();
