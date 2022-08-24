/* Express is an NPM package. It is a framework that condenses verbose 
nodejs into shorter statements to make it easier to read and write. 
$ npm install express

Now instead of requiring http, we can require express and do the samestuff
*/
const express = require("express");

/* Creating an express app. This is our server now*/
const app = express();

/* listen for requests on port 3000. The express object is our server now, 
instead of creating an http object and then doing 
const server = http.createServer(...) and then doing server.listen(...)

*/
app.listen(3000);

/* Handling get requests on express object
using the get() method. "If the requested url path is "/", then
run the code in the block: */
app.get("/", (req, res) => {

  /* Instead of using res.write() and res.end(), in express,
  we can just use res.send() */
  /* res.send("<p>Home page</p>");
  or use res.sendFile(), which normally takes an 
  absolute path as the main argument. To use a relative path, 
  we use an added options object specifying the relative root.
  In this case, __dirname returns the main project directory */
  res.sendFile("./views/index.html", { root: __dirname });
});

/* Use multiple get handlers to implement routing */
app.get("/about", (req, res) => {
  // res.send("<p>About page</p>");
  res.sendFile("./views/about.html", { root: __dirname });
});
 
/* redirect: 
(express automatically sets status codes)
If nothing matched upto this point, send the 404 page*/
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});
/* Note, in regular nodejs, the above reroute would need more code:

  case "/about-us":
    res.statusCode = 301;
    res.setHeader("Location", "/about");
    res.end();
    break;
*/

/* 404 page handler should be at the bottom to catch all other urls.
The express().use() function doesn't accept a path, so it'll run
for any request. However, a request will only make it down to this
part of the code if it hasn't been caught by any 
other get() request handlers above. In this case, we have to set 
the status code to 404 manually.
 */
app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});
 
/* Programming in Express is better than regular node
because it lets us program more logic into each request clearly
in its own function.   */