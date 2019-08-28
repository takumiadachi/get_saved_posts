import axios from "axios";
import { REDDIT_API_V1 } from "../../Constants/reddit_api_v1";

export default async function revokeToken(token, tokenType) {
  try {
    const revoked = await axios.post(
      `${REDDIT_API_V1}/revoke_token?token=${token}&token_type_hint=${tokenType}`
    );
    return revoked;
  } catch (error) {
    return null;
  }
}
