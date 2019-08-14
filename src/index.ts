import getCommentByIdExpanded from "./api/reddit/v1/getCommentByIdExpanded";
import getSavedSubmissions from "./api/reddit/v1/user/getSavedSubmissions";
import getCommentById from "./api/reddit/v1/getCommentById";
const fs = require("fs");

(async () => {
  const data = await getCommentById("ewunlr7");
  const json = JSON.stringify(data);
  console.log(json);
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
  // const content = await getPostByIdExpanded("evkxj13");
  // const json = JSON.stringify(content);
  // fs.writeFile("reddit_me.json", json, (err, result) => {
  //   if (err) console.log("error", err);
  // });
})();
