/**
 * Accepts a permalink in reddit api and returns and object with a submission id and or comment id.
 *
 * @param permalink
 */
export default function permalinkToId(permalink: string) {
  const split = permalink.split(/[/\?]+/);
  if (split[7]) {
    const data = { submissionId: split[5], commentId: split[7] };
    return data;
  } else if (split[5]) {
    return { submissionId: split[5] };
  } else {
    return null;
  }
}

(async () => {
  let url =
    "https://www.reddit.com/r/AskReddit/comments/cr6q08/do_kids_in_us_schools_really_dissect_frogs_in/ex272rc?utm_source=share&utm_medium=web2x";
  let data = permalinkToId(url);
  console.log(data);

  url = `https://www.reddit.com/r/TwoXChromosomes/comments/4al6fu/craving_vinegar/`;
  data = permalinkToId(url);
  console.log(data);
  // console.log(data);
  // const json = JSON.stringify(data);
  // fs.writeFile("./reddit_me.json", json, (err, result) => {
  //   if (err) console.log("error", err);
  // });
})();
