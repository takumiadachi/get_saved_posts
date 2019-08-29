import axios from "axios";
import { REDDIT_API_V1 } from "../../Constants/reddit_api_v1";

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
    const revoked = await axios.post(
      `${REDDIT_API_V1}/revoke_token?token=${token}&token_type_hint=${tokenType}`
    );
    return revoked;
  } catch (error) {
    return null;
  }
}

(async () => {
  const revoked = await revokeToken("bleh", "access_token");
  console.log(revoked);
})();
