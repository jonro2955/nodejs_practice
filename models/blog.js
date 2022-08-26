/* Import the Schema object from mongoose. It will allow us to easily set up a schema for mongodb: */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* Call the Schema object constructor with the "new" kw to instantiate it with the schema definition object like so. The timestamps option generates timestamps on new blogs and blog updates. */
const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    snippet: { type: String, required: true },
    body: { type: String, required: true },
  },
  { timestamps: true }
);

/* create a const to store this model and export it:*/
const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
