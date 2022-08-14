/* Using NPM:
Use NPM to install useful things like nodemon, which 
automatically restarts the node application when file 
changes are detected: 
$ sudo npm install --location=global nodemon
https://www.npmjs.com/package/nodemon
To run a nodejs file using nodemon, replace the word "node" with 
"nodemon"  
$ nodemon server.js

Using the package.json file:
The package.json file keeps track of any packages we install 
locally to our project. These are known as "dependencies" because
our app depends on them to work. We create it using 
$ npm init
It also wllows you to configure scripts like git, deploy, build.

The package-lock.json file:
This keeps track of different dependency versions that we have 
installed in our project. It is created when we install somthing
local to this project directory.

lodash: lodash is a utility library we'll be using in this tutorial
to practice using npm https://www.npmjs.com/package/lodash
When you install it using $ npm i --save lodash, the package.json 
file will have lodash in its dependencies list.
*/

const http = require("http");
const fs = require("fs");
const _ = require("lodash"); // it is convention to use an underscore for lodash

const server = http.createServer((req, res) => {
  // lodash
  const num = _.random(0, 20);
  console.log(num);
  // lodash has a function once() to make something run only once
  const greet = _.once(() => {
    console.log("hello");
  });
  greet();
  greet();

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
    case "/about-me":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
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
