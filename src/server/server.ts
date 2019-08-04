require("dotenv").config();
import path from "path";
// Express
import express from "express";
import bodyParser from "body-parser";
// Routers
import redditRouter from "../routers/reddit/router";
import generateRedditOAuthURL from "../routers/reddit/auth/generateRedditOAuthURL";
// Start the server with port.
const PORT: number = parseInt(process.env.PORT) || 4201;
// CouchDB
const nano = require('nano')('http://localhost:5984');
nano.db.create('alice')
// Initialize express.
const app = express();

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

/**
 * Express Middleware
 */
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
