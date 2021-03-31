console.log("start");
const puppeteer = require("puppeteer");

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(
		"https://www.footlocker.fr/fr/category/all/jordan/jordan-1.html"
	);
	const sneakers = await page.evaluate(() => {
		let snkrs = [];
		let list = document.querySelector("div.ProductCard");
		console.log(list);
		//let els = document.querySelectorAll("div.fl-product-productlist--item");
		//*[@id="main"]/div/div[2]/div/section/div/div[2]/ul[1]/li[6]/div[2]
		// els.forEach((el) => {
		// 	(list = el
		// 		.querySelector("div.fl-product-tile--name")
		// 		?.textContent.trim()),
		// 		snkrs.push({
		// 			title: el
		// 				.querySelector("div.fl-product-tile--name")
		// 				?.textContent.trim(),
		// 			url: el.querySelector("div.fl-product-tile--basic a")?.textContent,
		// 			img: el.querySelector("picture.fl-picture")?.src,
		// 		});
		// console.log(list);
		//	});
		return snkrs;
	});
	console.log("snkrs", sneakers);

	await browser.close();
})();
