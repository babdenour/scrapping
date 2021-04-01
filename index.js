console.log("start");
const puppeteer = require('puppeteer');
const month = '09';
const year = '2020';


const category = [
  {
    name: 'wallet'
  },
  {
    name: 'hat'
  },
  {
    name: 'bag'
  },
  {
    name: 'socks'
  }
]

const ndrt = 'http://ndrt.alkebulabz.com/category?cat=hat';
(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto(ndrt);
  const gears = await page.evaluate(() => {
    let movies = [];
    // let elements = document.querySelectorAll('div.list_item');
    let hats = document.querySelectorAll('.ndrt-hover');
    for (hat of hats) {
      movies.push({
        img: hat.querySelector('img')?.src,
        name: hat.querySelector('p.h4')?.textContent.trim(),
        price: parseFloat(hat.querySelector('p.text-gold')?.textContent.trim().slice(0,-2)),
        collection: hat.querySelector('em')?.textContent.trim()
      })
    }
    return movies;
  });
  
  gears.push({test: 'test'})
  console.log(gears);
  await browser.close();
})();
