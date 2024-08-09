import puppeteer from "puppeteer";

async function scrap() {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0"
    );
    await page.goto("https://store.epicgames.com/en-US/free-games", {
      waitUntil: "networkidle2",
    });
    await page.waitForSelector(".css-n446gb", { timeout: 600000 });

    //scrap
    const result = await page.evaluate(() => {
      const games = [];
      document.querySelectorAll(".css-n446gb").forEach((game) => {
        const gameText = game.textContent;
        const gameImage = game.querySelector("img")
          ? game.querySelector("img").src
          : null;
        games.push({ text: gameText, image: gameImage });
      });
      return games;
    });

    browser.close();
    console.log(result);
    return result;
  } catch (error) {
    console.log("scraping error: ", error);
  }
}

scrap();

export default scrap;
