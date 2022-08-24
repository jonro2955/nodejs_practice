/* https://www.youtube.com/watch?v=_GJKAs7A0_4&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=8&ab_channel=TheNetNinja

Middleware is any code that runs on the server between getting a request and sending a response.

The get(), use() methods we've been using are all examples of middleware. Other middleware include things like loggers for saving details of all requests, authenticators for checking the authentication status of each request, etc. We can implement these using the use() method.

get() runs only for requests to certain routes, while use() runs for all requests, provided the response has not been already handled by other code. 

This code is largely the same as 14.js with differences maked by the notes.
*/

const app = require("express")();
app.set("view engine", "ejs");
app.set("views", "views2");
app.listen(3000);

/* Here, we add a new use() middleware to log req details. A callback next() is provided to tell the app to proceed to the next part of the app below this function, otherwise, the app will freeze. */
app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});

/* Just something to run after the last next() method to test if it's working */
app.use((req, res, next) => {
  console.log('in the next middleware');
  next();
});

/* instead of coding the middleware we just made above, we can import and use npm's morgan package which will print useful stuff to the console. Like this:

$ npm i morgan

const morgan = require('morgan');
app.use(morgan('tiny'));

The "dev" option will print "GET / 304 9.264 ms - -" to the console. The "tiny" option will print "GET / 304 - - 9.264 ms" to the console.

*/

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
