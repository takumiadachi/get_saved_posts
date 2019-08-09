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
import { addRedditPost } from "../db/methods/addRedditPost";
import { TrimmedComment } from "../models/TrimmedComment";
(async () => {
  const response = await createUserDB("UniqueUser");
  console.log("dbName: ", response);
  const json = {
    created: "31-07-2019 4:42:51",
    ups: 10,
    body:
      "Got a sinus infection at the end of deload week for 531, so this week has been hell. But you’re fucking mistaken if you think I’m not going to deadlift with snot pouring out of every orifice until I likely pass out. Also just broke up with a girlfriend of six years and my grandfather died, idk if that’s really relevant though",
    permalink: "/r/Fitness/comments/ck6f4v/rant_wednesday/evkxj14/",
    replies: [
      {
        created: "31-07-2019 6:23:11",
        ups: 1,
        body:
          "I'm in sinus infection no2 in the last Three months, I can't even go to the gym with the pressure headaches and I'm afraid I'll fall over from the dizzyness. Feels bad.",
        permalink: "/r/Fitness/comments/ck6f4v/rant_wednesday/evlepre/",
        replies: []
      }
    ]
  };
  const tc = new TrimmedComment(
    json.ups,
    json.body,
    json.created,
    json.permalink,
    json.replies
  );
  const inserted = await addRedditPost("uniqueuser", tc);

  console.log("inserted: ", inserted);
})();

// Initialize express.
const app = express();

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

/**
 * Express Middleware
 */
// Session & session-file-store
var FileStore = require("session-file-store")(session);
var fileStoreOptions = {};
app.set("trust proxy", true); // trust first proxy
app.use(
  session({
    store: new FileStore(fileStoreOptions),
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
// Send pretty json with this line
app.set("json spaces", 2);

/**
 * Routes
 */
app.get("/", async (req, res) => {
  res.render(path.join(__dirname, "views/login/index.pug"), {
    authURL: generateRedditOAuthURL()
  });
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
