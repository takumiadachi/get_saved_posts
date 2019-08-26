require("dotenv").config();
import path from "path";
// Express
import express from "express";

// Middleware
import errorHandler from "errorhandler";
import bodyParser from "body-parser";
import session from "express-session";
import uuidv1 from "uuid/v1";

// Routers
import redditRouter from "./routers/reddit/router";
import generateRedditOAuthURL from "./routers/reddit/auth/generateRedditOAuthURL";

// Start the server with port.
const PORT: number = parseInt(process.env.PORT) || 4201;

// Initialize express.
const app = express();

app.locals.BASEURL = process.env.BASEURL;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));

/**
 * Express Middleware
 */

//Error Handler. Provides full stack - remove for production
app.use(errorHandler());
// Session & session-file-store
var FileStore = require("session-file-store")(session);
var fileStoreOptions = {};
app.set("trust proxy", true); // trust first proxy
app.use(
  session({
    // store: new FileStore(fileStoreOptions),
    secret: "keyboard cat",
    resave: false, // default = false
    saveUninitialized: false, // default = true
    cookie: {
      httpOnly: true,
      secure: false
      // maxAge: 2 * 60 * 60 * 100000 // 2hours
    }
  })
);
// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Use pug as our templating engine. It is built into express.
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));
app.use(express.static(path.join(__dirname, "public")));
// Send pretty/formatted json with this line
app.set("json spaces", 2);

// God middleware
app.use((req, res, next) => {
  console.log();
  if (req.session.views) {
    req.session.views++;
  } else {
    req.session.views = 1;
  }
  if (req.session.sessionID) {
    console.log(req.url, req.session.sessionID, req.session.views);
  } else {
    console.log(req.url, req.session.views);
  }
  next();
});

/**
 * Routes
 */
// Entry point Currently for the whole application
app.get("/", async (req, res) => {
  if (!req.session.sessionID) {
    // req.session.sessionID = "gre-" + uuidv1();
    req.session.sessionID = "gre-" + "uniqueid";
  }

  res.render(path.join(__dirname, "./views/login/index.pug"), {
    authURL: generateRedditOAuthURL()
  });
});

app.use("/reddit", redditRouter);

// 404 Route
app.get("*", function(req, res) {
  res.redirect("http://localhost:4201/reddit"); // change this back if in development
  // res
  //   .status(404) // HTTP status 404: NotFound
  //   .send("Not found");
});