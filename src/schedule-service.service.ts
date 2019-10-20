import { Injectable } from '@nestjs/common';
import { NestSchedule, Cron, Timeout } from 'nest-schedule';
import { ScraperService } from './scraper/scraper.service';
import { BreedsService } from './breeds/services/breeds/breeds.service';

@Injectable()
export class ScheduleServiceService extends NestSchedule {

  constructor(private scraper: ScraperService,
              private breedsService: BreedsService) {
    super();
  }

  @Cron('0 0 * * THU')
  async scrapeAkc() {
    const data = await this.scraper.scrapeAkc();
    this.upsertBreedData(data);
  }

  @Timeout(2500)
  async onceStarted() {
    const data = await this.scraper.scrapeAkc();
    this.upsertBreedData(data);
  }

  private upsertBreedData(data) {
    for (const breedNameKey in data) {
      if (breedNameKey) {
        this.breedsService.updateOrCreate(breedNameKey, data[breedNameKey]);
      }
    }
  }
}
