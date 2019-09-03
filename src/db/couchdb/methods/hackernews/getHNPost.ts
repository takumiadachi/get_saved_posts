import nano from "../../connect";

export default async function getHNPost(dbName: string, id) {
  try {
    const db = nano.use(dbName);
    const gotHNPost = await db.get(id);
    return gotHNPost;
  } catch (error) {
    console.log(error.reason);
    return null;
  }
}

(async () => {
  const post = await getHNPost("gre-uniqueid", "20857887");
  console.log(post);
})();
