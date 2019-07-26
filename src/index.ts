import getPostByIdExpanded from "./api/getPostByIdExpanded";
import getSavedSubmissions from "./api/getSavedSubmissions";

(async () => {
  // const topTrimmedComment = await getPostByIdExpanded("ehdp6z5", 10);
  // const topTrimmedComment = await getPostByIdExpanded("ehdz2uj", -20);
  // console.log(topTrimmedComment);
  const savedSubmissions = await getSavedSubmissions("");
  console.log(savedSubmissions);
})();
