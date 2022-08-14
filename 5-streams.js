/* Reading a large file in streaming mode means data comes in small packets called "buffers":

createReadStream
createWriteStream
*/
const fs = require("fs");

const readStream = fs.createReadStream("./docs/blog3.txt", { encoding: "utf-8" });
const writeStream = fs.createWriteStream("./docs/blog4.txt");

readStream.on("data", (buffer) => {
  console.log("\n\n----- NEW BUFFER -----\n\n");
  console.log(buffer);
  writeStream.write("\n\n----- NEW BUFFER -----\n\n");
  writeStream.write(buffer);
});

// Piping does the same thing as the above
// readStream.pipe(writeStream);
