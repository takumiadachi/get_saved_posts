import getPostByIdExpanded from "./api/getPostByIdExpanded";
import getSavedSubmissions from "./api/getSavedSubmissions";
const fs = require("fs");

(async () => {
  // const topTrimmedComment = await getPostByIdExpanded("ehdp6z5", 10);
  // const topTrimmedComment = await getPostByIdExpanded("ehdz2uj", -20);
  // console.log(topTrimmedComment);
  const content = await getPostByIdExpanded("ev0azy2", -20);
  const json = JSON.stringify(content);
  fs.writeFile("reddit_me.json", json, (err, result) => {
    if (err) console.log("error", err);
  });
  // const savedSubmissions = await getSavedSubmissions("");
  // console.log(savedSubmissions);
})();
