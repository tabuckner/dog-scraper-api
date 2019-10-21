import { Injectable } from '@nestjs/common';
import { NestSchedule, Cron, Timeout } from 'nest-schedule';
import { ScraperService } from './scraper/scraper.service';
import { BreedsService } from './breeds/services/breeds/breeds.service';
import { UpdateTrackerService } from './update-tracker/update-tracker.service';

@Injectable()
export class ScheduleServiceService extends NestSchedule {

  constructor(private scraper: ScraperService,
              private breedsService: BreedsService,
              private updateTrackerService: UpdateTrackerService) {
    super();
  }

  @Cron('0 0 * * THU')
  async scrapeAkc() {
    const data = await this.scraper.scrapeAkc();
    this.upsertBreedData(data);
  }

  @Timeout(2500)
  async onceStarted() {
    const shouldUpdate = await this.updateTrackerService.shouldUpdateData();
    if (shouldUpdate) {
      console.log('Data is more than 7 days old. Beginning the update process.'); // tslint:disable-line
      const data = await this.scraper.scrapeAkc();
      this.upsertBreedData(data);
    }
  }

  private upsertBreedData(data) {
    for (const breedNameKey in data) {
      if (breedNameKey) {
        this.breedsService.updateOrCreate(breedNameKey, data[breedNameKey]);
      }
    }
  }
}
