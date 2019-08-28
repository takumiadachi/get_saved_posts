import axios from "axios";
import { btoa } from "../../../../utility/btoa";
import { REDDIT_API_V1 } from "../../Constants/reddit_api_v1";
import AuthDetails from "../model/AuthDetails";

const REDDIT_CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const REDDIT_CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;
const REDDIT_REDIRECT_URI = process.env.REDDIT_REDIRECT_URI;

export default async function retrieveAccessToken(
  code,
  _id
): Promise<AuthDetails> {
  try {
    const response = await axios({
      method: "post",
      url: `${REDDIT_API_V1}access_token`, // https://www.reddit.com/api/v1/access_token
      params: {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDDIT_REDIRECT_URI
      },
      headers: {
        Authorization: `Basic ${btoa(
          REDDIT_CLIENT_ID + ":" + REDDIT_CLIENT_SECRET
        )}`,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    const authDetails = new AuthDetails(
      response.data.access_token,
      response.data.expires_in,
      response.data.refresh_token,
      response.data.scope,
      response.data.token_type,
      _id
    );
    return authDetails;
  } catch (error) {
    return null;
  }
}
