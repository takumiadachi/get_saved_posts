import { rMe } from "../../../config/r";

/**
 * Get wiki content of subreddit
 *
 * @param id
 * @param upVotes
 */
export default async function getSubredditWikiContent(
  subreddit: string,
  wiki: string
) {
  try {
    const page = rMe.getSubreddit(subreddit).getWikiPage(wiki).content_md;
    return page;
  } catch (error) {
    console.log(error);
    return null;
  }
}
