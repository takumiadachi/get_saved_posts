import generateRedditOAuthURL from "../routers/reddit/auth/methods/generateRedditOAuthURL";
import path from "path";

export default async function root(req, res) {
  if (!req.session.sessionID) {
    // req.session.sessionID = "gre-" + uuidv1();
    req.session.sessionID = "gre-" + "uniqueid";
  }

  res.render(path.join(__dirname, "../views/login/index.pug"), {
    authURL: generateRedditOAuthURL()
  });
}
