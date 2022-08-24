/* There is ready-made middleware we can import and use from npm called Morgan. Morgan is a HTTP request logger middleware for node.js.
$ npm i morgan

This file's code is the same as 15.js except the middleware code using use() is replaced with morgan methods
 */
const express = require("express");
const app = express();
/* import Morgan */
const morgan = require("morgan");
app.set("view engine", "ejs");
app.set("views", "views2");
app.listen(3000);

/* Morgan middleware: The "dev" option will print "GET / 304 9.264 ms - -" to the console. The "tiny" option will print something slightly different to the console. Check the documentation for all the options */
app.use(morgan("dev"));

/* Loading static files: The below code makes all files in /public available to this express app. We placed styles.css inside /public and placed "<link rel="stylesheet" href="/styles.css">" inside /views2/partials/head.ejs.  */
app.use(express.static("public"));

app.get("/", (req, res) => {
  const miniBlogs = [
    { title: "Yoshi finds eggs", snippet: "Lorem ipsum dolor sit amet consectetur" },
    { title: "Mario finds stars", snippet: "Lorem ipsum dolor sit amet consectetur" },
    { title: "How to defeat bowser", snippet: "Lorem ipsum dolor sit amet consectetur" },
  ];
  res.render("index.ejs", { title: "Home", miniBlogs: miniBlogs });
});
app.get("/about", (req, res) => {
  res.render("about.ejs", { title: "About" });
});
app.get("/blogs/create", (req, res) => {
  res.render("create.ejs", { title: "Create a new blog" });
});
app.use((req, res) => {
  res.status(404).render("404.ejs", { title: "404" });
});
