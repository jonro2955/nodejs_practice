/* Import modules using the require() operator with a const declaration. The external modules must export something.*/

const { people, ages } = require(`./3a-people`);
console.log(people, ages);

// os is core module built into node and it contains info about the current operating systsm
const os = require("os");
console.log(os);
console.log(os.platform(), os.arch());
