/* If you want to redirect a url to another one, 
for example, say you already have "/about", but you want to create
a better url name like "/about-me", then you need create a new url 
and redirect it to the old one. If you simply change the old url, 
then people who have the old link will get a 404 broken link. 
 */

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  res.setHeader("Content-type", "text/html");
  let path = "./views";
  switch (req.url) {
    case "/":
      path += "/index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "/about.html";
      res.statusCode = 200;
      break;

    /* Redirect for the "/about-me" case: */
    case "/about-me":
      // no need to append string to the path when redirecting
      // set the code to 301: "resource moved"
      res.statusCode = 301;
      // Redirection: set header's "Location" value to "/about"
      res.setHeader("Location", "/about");
      // need to end the response for redirect to work
      res.end();
      break;
    default:
      path += "/404.html";
      res.statusCode = 404;
      break;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      console.log("html read!");
      res.end(data);
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("listening to port 3000");
});

/* Note: managing routing and redirects this way can get very 
complicated. That is why there is a third part package called 
Express.*/
