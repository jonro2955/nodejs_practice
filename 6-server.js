/* https://www.youtube.com/watch?v=-HPZ1leCV8k&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=4&ab_channel=TheNetNinja
 */

/* To create a server, first import the core node module: the HTTP */
const http = require("http");

/* createServer() is how we create a server. We give it a (req, res)
callback and this will run every time a request comes in. Once the 
server is created, inside the (req, res) callback, the req and res 
arguments each return an objects many properties and methods pertaining
to the request and the result, respectively. */
const server = http.createServer((req, res) => {
  console.log("Request made");
  console.log(req.url, req.method);

  /*How to send back content:
  1. Set the header's "Content type" to be "text/html". This says 
  we're sending back some html in a string to the browser*/
  res.setHeader("Content-Type", "text/html");
  /* then we use write() to set the content, line by line.
  Default page elements like the <head> are inserted by default,
  but can be overrided if you set it using write()*/
  res.write("<head><title>My Page Title</title></head>");
  res.write("<h1>hello ninjas</h1>");
  res.write("<p>kick ass</p>");
  /* You have to end the response in order to send it*/
  res.end();
});
/* A better way is to create a separate file containing the 
  content and use the file system to send that instead of line 
  by line. See file 7-server.js to see how this is done*/

/* The server needs a listener with a port number. The second 
argument to the listener below is the host name, default being 
'loacalhost', which is like a domain name, but 
"localhost" connects right back to your own computer. 
Third argument is a callback which runs when we start listening. 
Once you run $ node 6-server, this callback will run. Next, if 
you type in the address bar "localhost:3000", the server will 
receive a request, which executes the above server callback*/
server.listen(3000, "localhost", () => {
  console.log("Listening for requests on port 3000");
});

/*  Port numbers are like doors into a computer. All the different 
apps on your machine that connects to the internet uses different 
ports. If they use the same port, they can have probs unless there
are special setups to deal with that*/
