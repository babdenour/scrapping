let catalog = [];

console.log("Début du scrapping");

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();

    await page.goto(`http://ndrt.alkebulabz.com/`);
    const categories = await page.evaluate(() => {
      let categoryList = [];
      // find categorie
      let categories = document.querySelectorAll('.card');
      // get categories name
      for (category of categories) {
        categoryList.push({
          name: category.querySelector('p.h5')?.textContent.trim()
        })
      }
      return categoryList;
    })
  
  for(category of categories){
    await page.goto(`http://ndrt.alkebulabz.com/category?cat=${category.name}`);
    const productList = await page.evaluate(() => {
      let productList = [];
      
      // get products from
      let products = document.querySelectorAll('.mb-1');
      for (product of products) {
        
        // get product information to create object
        productList.push({
          img: product.querySelector('img')?.src,
          name: product.querySelector('p.h4')?.textContent.trim(),
          price: parseFloat(product.querySelector('p.text-gold')?.textContent.trim().slice(0,-2)),
          collection: product.querySelector('em')?.textContent.trim()
        })
      }
      return productList;
    })
    
    // add categories product in same list
    for(product of productList){
      // add category name in product object
      product.category = category.name
      catalog.push(product)
    }
  }
  
  console.log(catalog);
  await browser.close();
  console.log("Fin du scrapping");
})();






