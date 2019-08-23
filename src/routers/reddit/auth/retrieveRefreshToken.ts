import axios from "axios";
import { btoa } from "../../../utility/btoa";
import { REDDIT_API_V1 } from "../Constants/reddit_api_v1";

const REDDIT_CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const REDDIT_CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;
const REDDIT_REDIRECT_URI = process.env.REDDIT_REDIRECT_URI;

export default async function retrieveRefreshToken(refresh_token) {
  try {
    const response = await axios({
      method: "post",
      url: `${REDDIT_API_V1}access_token`, // https://www.reddit.com/api/v1/access_token
      params: {
        grant_type: "refresh_token",
        refresh_token: refresh_token
      },
      headers: {
        Authorization: `Basic ${btoa(
          REDDIT_CLIENT_ID + ":" + REDDIT_CLIENT_SECRET
        )}`,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
