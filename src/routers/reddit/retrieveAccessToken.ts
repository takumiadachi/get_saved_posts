import axios from "axios";
import { btoa } from "../../utility/btoa";

const REDDIT_CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const REDDIT_CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;
const REDDIT_REDIRECT_URI = process.env.REDDIT_REDIRECT_URI;
import { REDDIT_API_V1 } from "./Constants/API_V1";

export default async function retrieveAccessToken(code) {
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
  return response.data;
}
