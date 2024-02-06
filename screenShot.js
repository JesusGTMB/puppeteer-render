const puppeteer = require("puppeteer");
require("dotenv").config();

const screenShot = async (res) => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
    const page = await browser.newPage();

    // Cambiamos la URL a Google.com
    await page.goto("https://www.google.com");

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    // Tomamos una captura de pantalla
    await page.screenshot({ path: 'google_screenshot.png' });

    // Enviamos una confirmación de que la captura se realizó
    res.send("Screenshot taken and saved as google_screenshot.png");
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { screenShot };