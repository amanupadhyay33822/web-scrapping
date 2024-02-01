const express = require("express");
const puppeteer = require("puppeteer");
const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config();

// curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_a5f209a5-zone-web_unlocker1:63eyeryoiwtf -k https://lumtest.com/myip.json

const app = express();
// app.get("/scrape", async (req, res) => {
//   try {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     const productUrl =
//       "https://www.amazon.in/Fire-Boltt-Bluetooth-Calling-Assistance-Resolution/dp/B0BF57RN3K/ref=sr_1_1?_encoding=UTF8&content-id=amzn1.sym.55c4284b-4a0e-450c-8425-f5dfafc06e30&pd_rd_r=a81babac-3d81-46b0-854e-38239668f39f&pd_rd_w=3Y33c&pd_rd_wg=69LAT&pf_rd_p=55c4284b-4a0e-450c-8425-f5dfafc06e30&pf_rd_r=3XVG5MHCT002VNGX8KQ5&qid=1696168493&sr=8-1&th=1";

//     await page.goto(productUrl);
//     const $ = cheerio.load(page.content);

//     const title = $("#productTitle").text().trim();
//     console.log($);
//     const priceElement = await page.$(".a-price-whole");
//     const pageTitle = await page.$("#productTitle");

//     const price = await priceElement.evaluate((element) => element.textContent);
//     await browser.close();
//
//   } catch (error) {}
// });

app.get("/",async (req,res)=> {
  res.send("hello")
})

app.get("/scripe", async (req, res) => {
  try {
    const productUrl =
      "https://www.github.careers/jobs?view=search&page=1";
    const username = process.env.BRIGHT_DATA_USERNAME;
    const password = process.env.BRIGHT_DATA_PASSWORD;
    const port = 22225;
    const session_id = (100000 * Math.random()) | 0;

    const options = {
      auth: {
        username: `${username}-session-${session_id}`,
        password,
      },
      host: "brd.superproxy.io",
      port,
      rejectUnauthorized: false,
    };

    const response = await axios.get(productUrl, options);

    const $ = cheerio.load(response.data);
    // console.log(response.data);
    const title = $("._ngcontent-tau-c162").text().trim();
    console.log(title);

    // Assuming you have the provided data structure stored in a variable named 'title'

    // Call the function to retrieve the data

    // Now, 'dataAttributeValue' contains the actual data

    // console.log(title[3].children[0]);
    // const outofstock = $("#availability").text().trim().toLowerCase() === 'currently unavailable';

    // const image = $("#landingImage").attr("data-a-dynamic-image")
    // const imageUrls = Object.keys(JSON.parse(image));
    const data = {
      title,
      // images: imageUrls[0],
      // Isoutofstock: outofstock,
    };
    return res.json(data);
    // return res.json({ title ,outofstock ,imageUrls});
  } catch (error) {
    res.json(error);
  }
});

app.listen(3000, () => {
  console.log(`server started at 3000`);
});
