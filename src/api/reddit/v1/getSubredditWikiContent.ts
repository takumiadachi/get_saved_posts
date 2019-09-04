import snoowrap from "snoowrap";

/**
 * Get wiki content of subreddit
 *
 * @param id
 * @param upVotes
 * @param snoowrapClient
 */
export default async function getSubredditWikiContent(
  subreddit: string,
  wiki: string,
  snoowrapClient: snoowrap
) {
  try {
    const page = snoowrapClient.getSubreddit(subreddit).getWikiPage(wiki)
      .content_md;
    return page;
  } catch (error) {
    console.log(error);
    return null;
  }
}
