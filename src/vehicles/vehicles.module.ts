import { Module } from '@nestjs/common';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FeatureVehicles } from './entities/vehicles.entity';
import { FeatureSponsors } from 'src/sponsors/entities/sponsors.entity';
import { HuggingfaceModule } from 'src/huggingface/huggingface.module';

@Module({
  imports: [
    HuggingfaceModule,
    MongooseModule.forFeature([FeatureVehicles, FeatureSponsors]),
  ],
  controllers: [VehiclesController],
  providers: [VehiclesService],
})
export class VehiclesModule {}
