require("dotenv").config();
import path from "path";
// Express
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";

// Routers
import redditRouter from "../routers/reddit/router";
import generateRedditOAuthURL from "../routers/reddit/auth/generateRedditOAuthURL";
// Start the server with port.
const PORT: number = parseInt(process.env.PORT) || 4201;
// CouchDB
import { createUserDB } from "../db/couchdb";
(async () => {
  const response = await createUserDB("UniqueUser");
  console.log(response);
})();

// Initialize express.
const app = express();

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

/**
 * Express Middleware
 */
// Session
app.set("trust proxy", true); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 2 * 60 * 60 * 1000 // 2hours
    }
  })
);
// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Use pug as our templating engine. It is built into express.
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

/**
 * Routes
 */
app.get("/", async (req, res) => {
  res.render(path.join(__dirname, "views/login/index.pug"), {
    authURL: generateRedditOAuthURL()
  });
});

app.get("/test", async (req, res) => {
  console.log(req.session);
  if (req.session.views) {
    req.session.views++;
    res.setHeader("Content-Type", "text/html");
    res.write("<p>views: " + req.session.views + "</p>");
    res.write("<p>expires in: " + req.session.cookie.maxAge / 1000 + "s</p>");
    res.end();
  } else {
    req.session.views = 1;
    res.end("welcome to the session demo. refresh!");
  }
});

app.use("/reddit", redditRouter);

app.get("/success", async (req, res) => {
  res.send("success");
});

// 404
app.get("*", function(req, res) {
  res
    .status(404) // HTTP status 404: NotFound
    .send("Not found");
});
