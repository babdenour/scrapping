const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
const Item = require("./dataModel");

//connection to db
mongoose.connect("mongodb://localhost:27017/scrappingdb", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection
	.once("open", function () {
		console.log("Connection has been made");
	})
	.on("error", function (error) {
		console.log("Connection error", error);
	});

//debut du scrap
console.log("Start scrapping");

let catalog = [];

(async () => {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();

	await page.goto(`http://ndrt.alkebulabz.com/`);
	const categories = await page.evaluate(() => {
		let categoryList = [];
		// find categorie
		let categories = document.querySelectorAll(".card");
		// get categories name
		for (category of categories) {
			categoryList.push({
				name: category.querySelector("p.h5")?.textContent.trim(),
			});
		}
		return categoryList;
	});

	for (category of categories) {
		await page.goto(`http://ndrt.alkebulabz.com/category?cat=${category.name}`);
		const productList = await page.evaluate(() => {
			let productList = [];

			// get products from
			let products = document.querySelectorAll(".mb-1");
			for (product of products) {
				// get product information to create object
				productList.push({
					img: product.querySelector("img")?.src,
					name: product.querySelector("p.h4")?.textContent.trim(),
					price: parseFloat(
						product
							.querySelector("p.text-gold")
							?.textContent.trim()
							.replaceAll("€", "")
							.replaceAll(" ", "")
					),
					collection_name: product.querySelector("em")?.textContent.trim(),
					ref: product
						.querySelector(".card")
						.getAttribute("onclick")
						.replaceAll("window.location='./product?ref=", "")
						.replaceAll("window.location='./product?ref=", "';"),
				});
			}
			return productList;
		});

		// add category name in product object
		productList.forEach((el) => {
			el.category = category.name;
			catalog.push(el);
		});
	}

	console.log(catalog);

	//	save in db;
	catalog.forEach((el) => {
		let item = new Item(el);
		item.save();
	});

	//close the browser
	await browser.close();
	console.log("END of scrapping");
})();
