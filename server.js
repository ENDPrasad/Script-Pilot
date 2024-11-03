const express = require('express');
const { chromium, BrowserType, msedge, safari, firefox, webkit } = require('playwright');
const {expect} = require('playwright/test')
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

let browser;
let context;
let page;

// Route to launch the browser
app.post('/launch-browser', async (req, res) => {
  try {
    if (!browser) {
      const browserType = req.body.browser
      if(browserType === 'chromium')
        browser = await chromium.launch({ headless: false }); // Launch browser with UI
      else if(browserType === 'edge')
        browser = await chromium.launch({ headless: false, channel: 'msedge' });
      else if(browserType === 'firefox')
        browser = await firefox.launch({ headless: false});
      else if(browserType === 'safari')
        browser = await webkit.launch({ headless: false});
      context = await browser.newContext();
      page = await context.newPage();
    }
    res.json({ success: true, message: 'Browser launched!' });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Route to navigate to a URL
app.post('/navigate', async (req, res) => {
  const { url } = req.body;

  if (!page) {
    return res.json({ success: false, error: 'Browser is not launched yet!' });
  }

  try {
    await page.goto(url, { waitUntil: 'networkidle' }); // Wait until network is idle
    res.json({ success: true, message: `Navigated to ${url}` });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Route to execute dynamic scripts on the active browser
app.post('/execute', async (req, res) => {
  const code = req.body.code;

  if (!page) {
    return res.json({ success: false, error: 'Browser is not launched yet!' });
  }

async function executeDynamicCode(page) {
    // Create an async function that returns the evaluated dynamic code
    let asyncFunc = new Function("page","expect", `return (async () => { ${code} })();`);

    // Execute the async function and wait for the operation to be performed
    await asyncFunc(page, expect);
}

// Call the function and pass the `page` object
executeDynamicCode(page).then(() => {
    result = `##${code}## executed successfully`
    res.json({ success: true, message:result });
}).catch(error => {
    res.json({ success: false, error: error.message });
});


});



// Route handler
app.post('/perform-action', async (req, res) => {
  const { windowNumber } = req.body;
  const page = browserContext.pages()[windowNumber - 1]; // Select the targeted page

  try {
      const result = await executeAction(page, req.body);
      res.status(200).send(result);
  } catch (error) {
      res.status(500).send('Failed to perform action: ' + error.message);
  }
});


// Route to close the browser
app.post('/close-browser', async (req, res) => {
  if (browser) {
    await browser.close();
    browser = null;
    context = null;
    page = null;
    res.json({ success: true, message: 'Browser closed!' });
  } else {
    res.json({ success: false, error: 'No browser to close!' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
