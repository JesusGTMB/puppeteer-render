const express = require("express");
const { scrapeLogic } = require("./scrapeLogic");
const { screenShot } = require("./screenshot");
const { login } = require("./loginN");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get("/scrape", (req, res) => {
  scrapeLogic(res);
});

app.get("/screenshot", (req, res) => {
  screenShot(res);
})

app.get("/", (req, res) => {
  res.send("Render Puppeteer server is up and running!");
});

app.get("/login", (req, res) => {
  login(req, res);
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
