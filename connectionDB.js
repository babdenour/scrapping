const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/scrappingdb");

mongoose.connection
	.once("open", function () {
		console.log("Conection has been made");
	})
	.on("error", function (error) {
		console.log("Connection error", error);
	});
