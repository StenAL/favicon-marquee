import { Browser, Builder, By, WebDriver } from "selenium-webdriver";
import { setTimeout } from "timers/promises";
import { resolve } from "path";

const LOCAL_FILE_PATH = resolve(process.cwd(), "examples", "example1.html");
const CONTAINER_FILE_PATH = "/files/examples/example1.html";
const DRIVER_CONNECTION_RETRIES = 3;
const runningInContainer = Boolean(process.env.SELENIUM_REMOTE_URL);

const createWebDriver = async (): Promise<WebDriver> => {
    for (let attempt = 1; attempt <= DRIVER_CONNECTION_RETRIES + 1; attempt++) {
        try {
            const driver = await new Builder().forBrowser(Browser.FIREFOX).build();
            console.log(`Successfully connected to driver on attempt ${attempt}!`);
            return driver;
        } catch (e) {
            const message = typeof e === "object" && e !== null && "message" in e ? e.message : undefined;
            console.log(`Failed to connect to  WebDriver on attempt ${attempt}${message ? `: ${message}` : undefined}`);
            await setTimeout(1000);
        }
    }
    throw new Error("Could not connect to WebDriver");
};

const run = async () => {
    console.log("Initializing...");
    const driver = await createWebDriver();
    const filePath = runningInContainer ? CONTAINER_FILE_PATH : LOCAL_FILE_PATH;
    await driver.get(`file://${filePath}`);
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
    console.error(e);
    process.exit(1);
});
