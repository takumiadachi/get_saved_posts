require("dotenv").config();
// Express
import express from "express";
import path from "path";
// Middleware
import errorHandler from "errorhandler";
import bodyParser from "body-parser";
import session from "express-session";
// Routers & routes
import redditRouter from "./routers/reddit/router";
import root from "./routes/root";
import notFound404 from "./routes/notFound404";

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
// app.use(errorHandler());
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
  // console.log();
  // if (req.session.views) {
  //   req.session.views++;
  // } else {
  //   req.session.views = 1;
  // }
  // if (req.session.sessionID) {
  //   console.log(req.url, req.session.sessionID, req.session.views);
  // } else {
  //   console.log(req.url, req.session.views);
  // }
  next();
});

/**
 * Routes
 */
app.get("/", root); // Entry point Currently for the whole application
app.use("/reddit", redditRouter);
app.get("*", notFound404); // 404 Route
