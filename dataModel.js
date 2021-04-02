const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Creat Shema and model
const ItemSchema = new Schema({
	ref: String,
	name: String,
	price: Number,
	category: String,
	collection_name: String,
	img: String,
});

const Item = mongoose.model("item", ItemSchema);

module.exports = Item;
