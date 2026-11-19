// Rasterises page.html at exactly 1024x1024 into entry.png with headless
// Chromium. Not part of the contest entry (the grader only runs main.ts);
// it exists so the artwork can be rebuilt from source:
//
//   node render.mjs          (from anywhere; paths resolve to this folder)
//
// playwright-core is resolved from ~/workspace/makefun, where it is
// installed; the Chromium build is the headless shell in the usual cache.
import { chromium } from "playwright-core";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const chrome =
  process.env.HOME +
  "/.cache/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-linux64/chrome-headless-shell";

const browser = await chromium.launch({ executablePath: chrome });
try {
  const page = await browser.newPage({ viewport: { width: 1024, height: 1024 } });
  await page.goto("file://" + join(here, "page.html"), { waitUntil: "load" });
  await page.waitForTimeout(250);
  await page.screenshot({ path: join(here, "entry.png"), type: "png" });
  console.log("render.mjs: wrote entry.png (1024x1024)");
} finally {
  await browser.close();
}
