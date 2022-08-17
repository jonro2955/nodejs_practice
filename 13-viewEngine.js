const app = require("express")();
/* https://www.youtube.com/watch?v=yXEesONd_54&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=7&ab_channel=TheNetNinja

This file does everything that 12-express.js does, but using 
a view engine. (Plus, we add mini blogs to the '/' page)

View Engines lets us write html templates injected with dynamic 
js, like JSX. In Express, You need a templating engine like "EJS"
(Embedded JavaScript) which is an npm package. 

Install EJS:
$ npm install ejs

An express app object has many attributes including one called
"view engine", which sets the template engine to a name of a npm 
package, in this case, "ejs". */
app.set("view engine", "ejs");

/* By defaut, express will look inside /views folder for
templates. But if you want to specify an alternate folder
like /views1, do the following and put .ejs files inside */
app.set("views", "views1");

app.listen(3000);

app.get("/", (req, res) => {

  /* create a simple array of 'mini blog' objects to pass to the ejs template */
  const miniBlogs = [
    { title: "Yoshi finds eggs", snippet: "Lorem ipsum dolor sit amet consectetur" },
    { title: "Mario finds stars", snippet: "Lorem ipsum dolor sit amet consectetur" },
    { title: "How to defeat bowser", snippet: "Lorem ipsum dolor sit amet consectetur" },
  ];

  /* EJS templates are processed by NodeJS on the server, which converts it
  into html and sends it to the browser
  To send an ejs file, use res.render() instead of 
  res.sendFile(). The res.render() method has 3 parameters:
  (view [, local variables] [, callback]).
  Express will look inside the earlier specified /views1 folder 
  for the view parameter.
  The optionally provided local variables will be available inside 
  the index.ejs view template. */
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
