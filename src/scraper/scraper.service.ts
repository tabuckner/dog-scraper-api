import { Injectable } from '@nestjs/common';
import { DogScraper, BreedInfo } from 'dog-scraper-core';
import { AKC_DATA_MOCK } from '../mocks/akc-data.mock';

@Injectable()
export class ScraperService {
  private scraper: DogScraper;

  constructor() {
    this.scraper = new DogScraper();
  }

  scrapeAkc(): Promise<BreedInfo> {
    return this.scraper.getBreedInfo();
    return this.getMockAkcData();
  }

  private getMockAkcData(): Promise<BreedInfo> {
    console.warn('Would be scraping here');
    return new Promise((res, rej) => {
      setTimeout(() => {
        console.warn('We Got it!');
        res(AKC_DATA_MOCK as BreedInfo);
      }, 2500);
    });
  }
}
