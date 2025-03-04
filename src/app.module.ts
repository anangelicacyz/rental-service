import 'dotenv/config'
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiclesModule } from './vehicles/vehicles.module';
import { PlansModule } from './plans/plans.module';
import { RentalsModule } from './rentals/rentals.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './db/DatabaseModule';
import { SecurityModule } from 'shared-sdk';
import { SponsorsModule } from './sponsors/sponsors.module';

@Module({
  imports: [
    SecurityModule,
    DatabaseModule,
    ConfigModule.forRoot({
      //envFilePath: '.env',
      isGlobal: true
    }),    
    VehiclesModule, 
    PlansModule, 
    RentalsModule, 
    MaintenanceModule, 
    SponsorsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
