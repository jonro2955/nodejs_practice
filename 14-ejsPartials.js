/* For this lesson, we are going to eliminate repeated code in our 
ejs templates by using partial templates. 
We created a new ejs views folder called /views2 and  
a new folder inside it called /partials. Partials allow you to 
change many pages by changing the template at a single location. 
Then we replaced the repeated code with include() statements. 
For example: <%- include('./partials/head.ejs') %>

We also placed all the styling in the head.ejs template
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
