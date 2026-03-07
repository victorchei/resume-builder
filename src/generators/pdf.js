import puppeteer from 'puppeteer';
import { generateHTML } from './html.js';

export async function generatePDF(data, variant, outputPath) {
  const html = generateHTML(data, variant);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: outputPath,
    format: 'A4',
    margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' },
    printBackground: true,
    displayHeaderFooter: false,
  });

  await browser.close();
}
