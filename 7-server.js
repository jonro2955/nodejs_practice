/* In this server, we are sending the contents of an html file 
from a file directory called ./views instead of writing out the 
html line by line from within our server callback */

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  res.setHeader("Content-type", "text/html");
  /* To send a file, read it using fs.readFile(). The first arg is 
  the file path. The second arg is a callback of the form 
  (err, data) => {}  
  which will execute when done reading.
  The err and data objects are avilable after reading is finished*/
  fs.readFile("./views/index.html", (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      console.log("html read!");
      // res.write(data);
      res.end(data);
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("listening to port 3000");
});
