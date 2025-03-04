import { Module } from '@nestjs/common';
import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FeaturePlans } from './entities/plans.entity';

@Module({
  imports: [MongooseModule.forFeature([FeaturePlans])],
  controllers: [PlansController],
  providers: [PlansService],
})
export class PlansModule {}
