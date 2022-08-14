/* Just like the Window global object in the browser, there is a global object in the 
server called "global" which has a bunch of properties and methods we can access
including clearInterval(), setInterval(), */


console.log(global);

// global.setTimeout(() => {
//   console.log(`3 sec timeout`);
//   clearInterval(int);
// }, 3000);

// const int = setInterval(() => {
//   console.log("1 sec interval");
// }, 1000);

console.log(__dirname); // curr directory path
console.log(__filename); // curr file path
