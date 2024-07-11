const mongoose = require("mongoose");
const Schema = mongoose.Schema

const articleSchema = new Schema( 
   { productId: { type: String, required: true },
   quantity: { type: Number, required: true },
   place: { type: Number, required: true }},

 );
const Article = mongoose.model("",articleSchema);
module.exports = Article;