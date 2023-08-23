import { chromium } from 'k6/experimental/browser'
import { check, sleep } from 'k6'


export const options = {
  stages: [
    { duration: '2m', target: 5 },
    { duration: '4m', target: 10 },
    { duration: '2m', target: 5 }
  ],
  ext: {
    loadimpact: {
      name: 'UI Test'
    }
  }
}

export default async function generateData () {
  const browser = chromium.launch({ headless: true })
  const page = browser.newPage()

  try {
    await page.goto('https://develop.d3nylssqqiptjw.amplifyapp.com/', {
      waitUntil: 'networkidle'
    })

    page.locator('[id="email-input"]').type('joebloggs@gmail.com')

    page.locator('[id="password-input"]').type('123456')

    await Promise.all([
      page.locator('[id="login-button"]').waitFor({ state: 'visible' }),
      page.click('[id="login-button"]'),

      page.click('[href="/data"]'),
      page.locator('[id="entries-counter"]').waitFor({ state: 'visible' }),
      page.click('[id="entries-counter"]'),
      page.locator('[id="templates-selector"]').waitFor({ state: 'visible' }),
      page.click('[id="submit-template"]'),
      page.click('[id="generate-values"]'),
      page.locator('[id="download-button"]').waitFor({ state: 'visible' }),
      page.click('[id="download-button"]'),
    ])
    const downloadButton = page.locator('[id="download-button"]');

    const isVisible = downloadButton.isVisible();
  
    check(isVisible, { 'Download button is visible': isVisible });
    
  } finally {
    page.close()
    browser.close()
  }
}
