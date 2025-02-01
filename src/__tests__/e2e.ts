import { Browser, Builder, By, WebDriver } from "selenium-webdriver";
import { setTimeout } from "timers/promises";
import { resolve } from "path";
import { unlink, writeFile } from "node:fs/promises";

const LOCAL_FILE_PATH = resolve(process.cwd(), "examples", "example1.html");
const CONTAINER_FILE_PATH = "/files/examples/example1.html";
const HEALTHCHECK_FILE = "/tmp/favicon-marquee-node-container-ready";

const DRIVER_CONNECTION_RETRIES = 3;
const RECORDING_WAIT_RETRIES = 5;

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

const waitForRecording = async () => {
    for (let attempt = 1; attempt <= RECORDING_WAIT_RETRIES + 1; attempt++) {
        try {
            await fetch("http://firefox_recording:9000");
            console.log(`video is recording on attempt ${attempt}!`);
            return;
        } catch (e) {
            const message = typeof e === "object" && e !== null && "message" in e ? e.message : undefined;
            console.log(`Video not recording yet, attempt ${attempt}${message ? ` (${message})` : undefined}`);
            await setTimeout(1000);
        }
    }
    throw new Error("Video recording container did not start");
};

const signalReady = async () => {
    console.log(`Creating healthcheck file at ${HEALTHCHECK_FILE}`);
    await writeFile(HEALTHCHECK_FILE, "");
};

console.log("Initializing...");
const driver = await createWebDriver();
const filePath = runningInContainer ? CONTAINER_FILE_PATH : LOCAL_FILE_PATH;
await driver.get(`file://${filePath}`);
console.log("Website loaded!");
await driver.findElement(By.id("stop-marquee")).click();
if (runningInContainer) {
    await signalReady();
    console.log("Waiting for recording container to start");
    await waitForRecording();
}
await driver.findElement(By.id("start-marquee")).click();
try {
    console.log("Waiting 5 seconds");
    await setTimeout(5000);
} finally {
    console.log("Teardown...");
    await driver.quit();
    if (runningInContainer) {
        await unlink(HEALTHCHECK_FILE);
    }
}
