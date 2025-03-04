import { Module } from '@nestjs/common';
import { MaintenanceController } from './maintenance.controller';
import { MaintenanceService } from './maintenance.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FeatureMaintenance } from './entities/maintenance.entity';
import { FeatureVehicles } from 'src/vehicles/entities/vehicles.entity';

@Module({
  imports: [MongooseModule.forFeature([FeatureMaintenance, FeatureVehicles])],
  controllers: [MaintenanceController],
  providers: [MaintenanceService]
})
export class MaintenanceModule {}
