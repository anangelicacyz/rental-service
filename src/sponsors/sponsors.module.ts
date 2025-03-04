import { Module } from '@nestjs/common';
import { SponsorsController } from './sponsors.controller';
import { SponsorsService } from './sponsors.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FeatureSponsors } from './entities/sponsors.entity';

@Module({
  imports: [MongooseModule.forFeature([FeatureSponsors])],
  controllers: [SponsorsController],
  providers: [SponsorsService]
})
export class SponsorsModule {}
