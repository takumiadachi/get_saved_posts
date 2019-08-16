/**
 * Accepts a permalink in reddit api and returns and object with a submission id and or comment id.
 *
 * @param permalink
 */
export default async function permalinkToId(permalink: string) {
  console.log(permalink);
}

(async () => {
  const url =
    "https://www.reddit.com/r/AskReddit/comments/cr6q08/do_kids_in_us_schools_really_dissect_frogs_in/ex272rc?utm_source=share&utm_medium=web2x";

  const data = await permalinkToId(url);
  // console.log(data);
  // const json = JSON.stringify(data);
  // fs.writeFile("./reddit_me.json", json, (err, result) => {
  //   if (err) console.log("error", err);
  // });
})();
