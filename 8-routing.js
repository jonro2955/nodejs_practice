/* In this server, we implement routing using a variable path
string that changes depending on the request url. We send 
different files based on the path string*/

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  res.setHeader("Content-type", "text/html");
  let path = "./views";
  /* To load different html pages depending on the url, evaluate 
  the req.url property and then change the path based on it.*/
  switch (req.url) {
    case "/":
      path += "/index.html";
      break;
    case "/about":
      path += "/about.html";
      break;
    default:
      path += "/404.html";
      break;
  }

  /* To load the variably routed path, set it as the first argument
  in readFile() */
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
