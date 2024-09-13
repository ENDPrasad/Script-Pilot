const express = require('express');
const { chromium } = require('playwright');
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
      browser = await chromium.launch({ headless: false }); // Launch browser with UI
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
    let asyncFunc = new Function("page", `return (async () => { ${code} })();`);

    // Execute the async function and wait for the operation to be performed
    await asyncFunc(page);
}

// Call the function and pass the `page` object
executeDynamicCode(page).then(() => {
    result = "Step executed successfully"
    res.json({ success: true, result });
}).catch(error => {
    res.json({ success: false, error: error.message });
});


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
