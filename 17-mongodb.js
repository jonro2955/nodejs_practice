/* Tut #9: MongoDB

https://www.youtube.com/watch?v=bxsemcrY4gQ&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=9&ab_channel=TheNetNinja 30:45

https://account.mongodb.com/account/login/

MongoDB is a NoSQL database which uses collections and documents instead of tables/rows/columns as in relational SQL databases like MySQL. NoSQL focuses on scaling, fast queries, allowing for frequent application changes, and making programming simpler for developers. Relational databases accessed with SQL focuses on reducing data duplication, as storage was much more costly than developer time in the 1970s when it was developed.  

NoSQL collections can hold many documents of one type only, so to create different types of documents, you need to create new collections. In this app, we'll create a collection for blog posts. The collection will contain only blog documents. Documents (docs) are written in the same key-value syntax as JSON objects.

To use MongoDB, we can install it locally or use a cloud version hosted online. The cloud version is easier to set up and it's called MongoDB Atlas. They both require the same code to program, so it's better to use the cloud version for learning.

MongoDB connection string from the cloud console: mongodb+srv://netNinja:test1234@nodeninja.crrgmpu.mongodb.net/?retryWrites=true&w=majority

We use Mongoose to make mongoDB code less verbose: npm i mongoose

*/

const express = require("express");
const morgan = require("morgan");
const app = express();
/* express.static() is a built-in middleware that serves static files and is based on serve-static. We use it to load CSS files from /public */
app.use(express.static("public"));

/* Import mongoose and connect using the connection string from the cloud console*/
const mongoose = require("mongoose");
const dbURI =
  "mongodb+srv://netNinja:test1234@nodeninja.crrgmpu.mongodb.net/nodeNinja?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("Connected to DB");
    /* Only listen for requests after connecting to db */
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

/*  app.listen(3000); was moved from here to inside the .then() promise. 
We then created a folder called /models where we create "schemas" for our blogs. A schema is what defines the "structure" of a document in a collection. The file /models/blog.js defines the schema for our blogs.
 */

app.set("view engine", "ejs");
app.set("views", "views2");
app.use(morgan("dev"));

/* Import the blog schema */
const Blog = require("./models/blog");

/* On loading the /add-blog route, save a new blog object as specified below in mongodb with a new timestamp and send the corresponding json over to the browser */
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

/* Get all blogs using Blog.find() on the Blog schema object itself (not on a new instance of it). Sends only the json data to the browser.*/
app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

/* Load the index HTML page template populated with the blogs using res.render("index", {... ejs template values...}) */
app.get("/sorted-blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: 1 }) // createdAt sorts by timestamps. 1 means ascending, -1 means descending
    .then((result) => {
      res.render("index", { title: "All Blogs", miniBlogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

/* Get a blog by id using Blog.findById(). Sends the json data to the browser.*/
app.get("/single-blog", (req, res) => {
  Blog.findById("630726608bea3047bc761ba6")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

/* Redirect */
app.get("/blogs", (req, res) => {
  res.redirect("/sorted-blogs");
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
