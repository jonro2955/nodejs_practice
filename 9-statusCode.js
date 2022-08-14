/* Status codes decribe the type of response sent to the browser.

Main codes
200: ok
301: resource moved
404: not found
500: internal server error

Other codes:
100 range: informational responses
200 range: success code
300 range: codes for redirects
400 range: user or client error
500 range: server error codes
*/

/* In this server, we implement routing using a variable path
string that changes depending on the request url. We send 
different files based on the path string*/

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  res.setHeader("Content-type", "text/html");
  let path = "./views";
  switch (req.url) {
    case "/":
      path += "/index.html";
      // set status code
      res.statusCode = 200;
      break;
    case "/about":
      path += "/about.html";
      // set status code
      res.statusCode = 200;
      break;
    default:
      path += "/404.html";
      // set status code
      res.statusCode = 404;
      break;
  }

  /* You can check the codes in the browser by pressing f12 and 
  going to the network tab (hit refresh)*/

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.end(data);
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("listening to port 3000");
});
