import { Browser, Builder, By } from "selenium-webdriver";
import { setTimeout } from "timers/promises";
import { resolve } from "path";

const FILE_URL = resolve(process.cwd(), "examples", "example1.html");
const run = async () => {
    console.log("Initializing...");
    const driver = await new Builder().forBrowser(Browser.FIREFOX).build();
    await driver.get(`file://${FILE_URL}`);
    console.log("Website loaded!");
    await driver.findElement(By.id("stop-marquee")).click();
    await driver.findElement(By.id("start-marquee")).click();
    try {
        console.log("Waiting 5 seconds");
        await setTimeout(5000);
    } finally {
        console.log("Teardown...");
        await driver.quit();
    }
};

run().catch((e) => {
    console.log(e);
    process.exit(1);
});
