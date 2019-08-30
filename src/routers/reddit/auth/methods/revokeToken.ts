import axios from "axios";
import { REDDIT_API_V1 } from "../../Constants/reddit_api_v1";
import { btoa } from "../../../../utility/btoa";
/**
 * Revoke access token
 *
 * [tokenType] can be 'access_token' or 'refresh_token'
 *
 * @param token
 * @param tokenType
 */
export default async function revokeToken(token, tokenType) {
  if (tokenType !== "access_token" && tokenType !== "refresh_token") {
    throw new Error("Not valid token type.");
  }
  try {
    // Need proper authorization headers
    // console.log(
    //   `${REDDIT_API_V1}revoke_token?token=${token}&token_type_hint=${tokenType}`
    // );
    // const revoked = await axios.post(
    //   `${REDDIT_API_V1}revoke_token?token=${token}&token_type_hint=${tokenType}`
    // );
    const revoked = await axios({
      method: "post",
      url: `https://www.reddit.com/revoke_token?token=${token}&token_type_hint=${tokenType}`,
      headers: {
        Authorization: `Basic ${btoa(
          process.env.REDDIT_CLIENT_ID + ":" + process.env.REDDIT_CLIENT_SECRET
        )}`
      }
    });
    console.log("revoke", revoked);
    return revoked;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// (async () => {
//   const revoked = await revokeToken(
//     "290425859781-zJUqPg-9jkH_9Hv84NGmKc4Csg4",
//     "access_token"
//   );
//   console.log(revoked);
// })();
