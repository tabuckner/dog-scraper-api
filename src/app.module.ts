import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BreedsModule } from './breeds/breeds.module';

const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const DB_URI = `mongodb+srv://developer:${MONGO_PASSWORD}@cluster0-syfgo.mongodb.net/test?retryWrites=true&w=majority`;

@Module({
  imports: [
    MongooseModule.forRoot(DB_URI),
    BreedsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
