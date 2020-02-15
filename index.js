const express = require("express");
const path = require("path");
const puppeteer = require("puppeteer");


const app = express();
const port = process.env.PORT || "8000";


app.get("/", async (req, res) => {
  let pageUri = req.query.uri;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.emulateMedia("screen");
  await page.goto(pageUri, {
        timeout: 30 * 1000,
        waitUntil: "networkidle0"
  });
  const html = await page.content();
  res.status(200).send(html);
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
