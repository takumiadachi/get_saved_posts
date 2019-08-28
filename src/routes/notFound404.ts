export default async function notFound404(req, res) {
  res.redirect("http://localhost:4201/reddit"); // change this back if in development
  // res
  //   .status(404) // HTTP status 404: NotFound
  //   .send("Not found");
}
