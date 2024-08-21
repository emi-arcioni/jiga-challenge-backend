import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class AppService {
  async getContent(page, selector) {
    return await page.evaluate(
      (selector) => document.querySelector(selector)?.innerText,
      selector,
    );
  }

  async getNews(): Promise<string[]> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://news.google.com', { timeout: 0 });

    const articlesText = await page.evaluate(() => {
      // Create an array to store the text
      const texts = [];

      // Select all <article> elements
      const articles = document.querySelectorAll('article');

      articles.forEach((article) => {
        // Find all <a> elements with tabIndex=0 inside the current <article>
        const links = article.querySelectorAll('a[tabindex="0"]');

        links.forEach((link) => {
          // Push the text content of each <a> element into the array
          texts.push(link.textContent.trim());
        });
      });

      return texts;
    });

    return articlesText;
  }
}
