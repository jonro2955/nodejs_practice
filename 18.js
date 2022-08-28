/* Tut #10: Get, Post & Delete Requests

https://www.youtube.com/watch?v=VVGgacjzc2Y&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=10&ab_channel=TheNetNinja 11:55

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
const { result } = require("lodash");
const { render } = require("ejs");
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

/* We need this middleware to handle POSTs when user clicks 'submit' on the new blog creator form. express.urlencoded() attaches the form data onto the req object as a prop called 'body', so you can get the data by calling 'req.body'*/
app.use(express.urlencoded({ extended: true }));
/* POST handler: Once you have the express.urlencoded() middleware, req.body returns the info from the web form as a simple object with the 'name' attributes as keys and their field values as the associated values*/
app.post("/blogs", (req, res) => {
  console.log(req.body);
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

/* Then we add anchor tags around each blog preview (title and snippet elements) in index.ejs. Next, use a colon operator at the end of the route to extract the value of the text at that part of the url. This value can be obtained from the request object.*/
app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/", (req, res) => {
  res.redirect("/blogs");
});
app.get("/about", (req, res) => {
  res.render("about.ejs", { title: "About" });
});
app.get("/blogs/create", (req, res) => {
  res.render("create.ejs", { title: "Create a new blog" });
});
app.get("/single-blog", (req, res) => {
  Blog.findById("630726608bea3047bc761ba6")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
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
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: 1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", miniBlogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.use((req, res) => {
  res.status(404).render("404.ejs", { title: "404" });
});
