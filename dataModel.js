const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Creat Shema and model
const ItemSchema = new Schema({
	img: String,
	name: String,
	price: Number,
	collection_name: String,
	ref: String,
	category: String,
});

const Item = mongoose.model("item", ItemSchema);

module.exports = Item;
