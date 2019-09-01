import nano from "../../connect";

export default async function getRedditPost(dbName: string, _id) {
  try {
    const db = nano.use(dbName);
    const post = await db.get(_id);

    return post;
  } catch (error) {
    console.log(error.reason);
    return null;
  }
}
