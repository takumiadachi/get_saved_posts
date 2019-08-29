import { REDDIT_API_V1 } from "../../Constants/reddit_api_v1";

/**
 *
 * Generates a reddit oauth URL to obtain a access token.
 *
 * Example output:
 *
 * ${REDDIT_API_V1}authorize?client_id=${clientId}&response_type=code&state=${state}&redirect_uri=${redirectUri}&duration=${duration}&scope=${scope}
 *
 * @param clientId
 * @param redirectUri
 * @param scope
 * @param duration
 * @param state
 */
export default function generateRedditOAuthURL(
  clientId: string = process.env.REDDIT_CLIENT_ID,
  redirectUri: string = process.env.REDDIT_REDIRECT_URI,
  scope: string = process.env.REDDIT_SCOPE,
  duration: string = "permanent",
  state: string = "yourstate"
): string {
  const oAuthURL: string = `${REDDIT_API_V1}authorize?client_id=${clientId}&response_type=code&state=${state}&redirect_uri=${redirectUri}&duration=${duration}&scope=${scope}`;
  return oAuthURL;
}
