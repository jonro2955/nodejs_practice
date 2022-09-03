/* Tut #11 continued (MVC) 

https://www.youtube.com/watch?v=zW_tZR0Ir3Q&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=11  9:44

https://github.com/iamshaunjp/node-crash-course

MVC is a way of organizing large apps into many smaller files that each do a specific job. We categorize these files into 3 broad groups called model, view and controller. Splitting up an app into smaller files and grouping them like this makes it easier to find problems and to maintain.

Models: Models is where we describe the data structures that are used to interact with the database. In this app, this is the /models folder. 

Views: Views is where we store files and templates that the user will 'see'. Here, our HTML templates are organized into /views folders.

Controllers: A controller links the model and the view together. It gets data from a model and passes it to a view to so it can be rendered. This is what our route handlers in routes/blogRoutes.js were doing. But now we will extract those route handlers into functions in a separate controller file, then reference those functions in our a new routes file /routes/blogRoutes2.js. 



First we create a new file called /controllers/blogController.js. There, we extract the route handler functions from /routes/blogRoutes.js with new MDN naming conventions which are all then exported.

Then we import those functions in /routes/blogRoutes2.js and use them. The router is then exported.

Then in here we simply import and use the router from /routes/blogRoutes2. Everything should work the same as before because the only thing we changed is the organization of the files.
*/

/* Import the new controller router */
const blogRoutes2 = require("./routes/blogRoutes2");

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
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.redirect("/blogs");
});
app.get("/about", (req, res) => {
  res.render("about.ejs", { title: "About" });
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
/* Use the new controller router */
app.use("/blogs", blogRoutes2);
app.use((req, res) => {
  res.status(404).render("404.ejs", { title: "404" });
});
