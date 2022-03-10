const puppeteer = require("puppeteer");

let queue = [];
const addToQueue = (url) => queue.push(url);

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || "";
const CHALLURL = `https://${HOST}:${PORT}`;
const ADMIN_PASS = process.env.ADMIN_PASS || "admin";

const visit = (url) => {
    let browser, page;
    return new Promise(async (resolve, reject) => {
        try {
            browser = await puppeteer.launch({
                headless: true,
                args: [
                    "--no-sandbox",
                    "--disable-setuid-sandbox",
                    "--ignore-certificate-errors",
                    "--ssl-key-log-file=./ssl.log",
                ],
                timeout: 1000 * 60 * 3,
                ignoreHTTPSErrors: true,
            });
            page = await browser.newPage();

            const response = await page.goto(CHALLURL + "/user/login", {
                timeout: 0,
            });

            await page.type("#username", "admin", {
                delay: 100,
            });
            await page.type("#password", ADMIN_PASS, {
                delay: 100,
            });

            await Promise.all([
                page.click("#submit"),
                page.waitForNavigation({ waitUntil: "networkidle2" }),
            ]);

            await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });

            await new Promise((resolve) => setTimeout(resolve, 3e3));

            console.log(`[-] done: ${url}`);

            await page.close();
            await browser.close();
            page = null;
            browser = null;
        } catch (err) {
            console.log(err);
        } finally {
            if (page) await page.close();
            if (browser) await browser.close();
            resolve();
        }
    });
};

const loop = async () => {
    while (true) {
        let url = queue.shift();
        if (url) {
            console.log("vistiting:", url, queue);
            await visit(url);
        }
        await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    }
};

loop();
module.exports = {
    addToQueue,
};
