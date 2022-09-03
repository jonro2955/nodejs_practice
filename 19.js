/* Tut# 11: Express Router & MVC 

https://www.youtube.com/watch?v=zW_tZR0Ir3Q&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=11 4:35

https://github.com/iamshaunjp/node-crash-course

Using express router, we can organize the routes into separate files. In 18.js, there were many handlers for the "/blogs" route, so in /route/blogRoutes.js, we created a folder and file just for this route. Then we moved all the handlers for the "/blogs" route from here into that file. There, we created an express router instance and replaced all the route handler's the 'app' references with the express router reference. Then we export it from there and import it in here.
*/
const blogRoutes = require("./routes/blogRoutes");

const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(express.static("public"));
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.set("views", "views2");
const Blog = require("./models/blog"); // models/blog.js
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
/* Now just use the imported blogRoutes here like this to apply all the routes on the /routes/blogRoutes.js file to the app object. But additionally, if we scope it out to '/blogs', then those routes will only apply when the url ends with '/blogs'. In this case, we need to remove the "blogs" part from each of the route strings in /route/blogRoutes.js*/
app.use('/blogs',blogRoutes);
app.use((req, res) => {
  res.status(404).render("404.ejs", { title: "404" });
});
