/* Tut #10: Get, Post & Delete Requests

https://www.youtube.com/watch?v=VVGgacjzc2Y&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=10&ab_channel=TheNetNinja

We've been using only app.get() requests so far (other than app.set() and app.use()). Now we'll use the other 3 main server request types:  post, delete, and put (update)

*/
const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(express.static("public"));
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.set("views", "views2");
const Blog = require("./models/blog");
const mongoose = require("mongoose");
const { urlencoded } = require("express");
const dbURI =
  "mongodb+srv://netNinja:test1234@nodeninja.crrgmpu.mongodb.net/nodeNinja?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("Connected to DB");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "simple blog 2",
    snippet: "about my new blog",
    body: "more about my blog",
  });
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/json-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/all-blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: 1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", miniBlogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

/* Need this middleware to handle POSTs when user clicks 'submit' on the new blog creator form*/
app.use(express.urlencoded({ extended: true }));
/* POST handler */
app.post("/blogs", (req, res) => {});

app.get("/single-blog", (req, res) => {
  Blog.findById("630726608bea3047bc761ba6")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/blogs", (req, res) => {
  res.redirect("/all-blogs");
});
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
