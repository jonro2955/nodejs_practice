/* This ia a continuation of the view engines lesson.
This is basically the same as 13-viewEngine.js, the 
only difference is that we're using /views2  
as our view folder.

We created a new views folder called /views2 with the same 
ejs templates for all of our pages. And we also create  
a new inner folder called /partials with partial ejs templates 
inside. Partials are templates that
are inserted into other templates, allowing you to 
change many pages with such insertions by changing the template at 
a single location. We inserted these partials inside our page templates.

We also placed all the styling in the head.ejs template.
*/

const app = require("express")();
app.set("view engine", "ejs");
app.set("views", "views2");
app.listen(3000);
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
