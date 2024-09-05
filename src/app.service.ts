import { Injectable } from '@nestjs/common';
import * as xmljs from 'xml-js';
import axios from 'axios';

@Injectable()
export class AppService {
  async getContent(page, selector) {
    return await page.evaluate(
      (selector) => document.querySelector(selector)?.innerText,
      selector,
    );
  }

  async getNews(query: string): Promise<string[]> {
    try {
      const response = await axios.get(
        `https://news.google.com/rss?q=${query}`,
      );
      const { data } = response; // TODO: check data if it's ok

      const result = xmljs.xml2json(data, { compact: true, spaces: 4 });
      const resJson = JSON.parse(result);
      return resJson.rss.channel.item.map((news) => news.title._text);
    } catch (err) {
      console.log(err);
    }
  }
}
