require("dotenv").config();
import path from "path";
// Express
import express from "express";
// Routers
import redditRouter from "../routers/reddit/router";
// Start the server with port.
const PORT: number = parseInt(process.env.PORT) || 4201;
// Initialize express.
const app = express();

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

// express middleware
// Use pug as our templating engine. It is built into express.
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  res.render(path.join(__dirname, "views/login/index.pug"), { title: "hi" });
});

app.use("/reddit", redditRouter);
// 404
app.get("*", function(req, res) {
  res
    .status(404) // HTTP status 404: NotFound
    .send("Not found");
});
