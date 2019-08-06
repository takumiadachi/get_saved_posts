import getPostByIdExpanded from "./api/reddit/v1/getPostByIdExpanded";
import getSavedSubmissions from "./api/reddit/v1/getSavedSubmissions";
import getPostById from "./api/reddit/v1/getPostById";
const fs = require("fs");

(async () => {
  // const content = await getPostByIdExpanded("ev0azy2", 0); // Replace ev0azy2 with another comment id
  // const json = JSON.stringify(content);
  // fs.writeFile("reddit_me.json", json, (err, result) => {
  //   if (err) console.log("error", err);
  // });
  // const savedSubmissions = await getSavedSubmissions("");
  // console.log(savedSubmissions);
  // const content = await getPostByIdExpanded("evkxj13", -20);
  // const json = JSON.stringify(content);
  // fs.writeFile("reddit_me.json", json, (err, result) => {
  //   if (err) console.log("error", err);
  // });
  const content = await getPostByIdExpanded("evkxj13");
  const json = JSON.stringify(content);
  fs.writeFile("reddit_me.json", json, (err, result) => {
    if (err) console.log("error", err);
  });
})();
