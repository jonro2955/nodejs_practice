const fs = require("fs");

/* Reading files:
fs.readFile() is asynchronous, runs the callback when done reading. Many file operations are asynchronous.
 */

fs.readFile("./docs/blog.txt", (err, data) => {
  if (err) {
    console.log(err);
  }
  // Without the toString() method, data would return a "buffer"
  console.log(data.toString());
});
console.log("last line");

/* Writing files:
writeFile() replaces the contents of the file.
If the specified file is not found, it is created.
 */
fs.writeFile("./docs/blog.txt", "hello, world", () => {
  console.log("file was written");
});
fs.writeFile("./docs/blog2.txt", "hello, world 2", () => {
  console.log("file2 was written");
});

/* Directories: create and delete directories
Use existsSync() first to check 
mkdir()
rmdir()
*/
if (!fs.existsSync("./assets")) {
  fs.mkdir("./assets", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("assets folder created");
  });
} else {
  fs.rmdir("./assets", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("assets folder deleted");
  });
}

/* Deleting files:
unlink
 */
if (fs.existsSync("./docs/deleteme.txt")) {
  fs.unlink("./docs/deleteme.txt", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("file deleted");
  });
}
