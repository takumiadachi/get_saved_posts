// export function addRedditPostRoute(data,) {
//   const lastPage = req.header("Referer") || "/"; // Good practice to redirect to last page used after post

//   const data = req.body.data;
//   const id = permalinkToId(data);

//   if (id.submissionId) {
//     const post = await getSubmissionById(id.submissionId, snoowrapConfig);
//     const addedPost = await addRedditPost(req.session.sessionID, post);
//   }
//   // Send back a confirmation that reddit post was successfully added
//   res.redirect(lastPage);
// }
