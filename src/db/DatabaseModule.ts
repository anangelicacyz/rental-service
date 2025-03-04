import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { MongooseConfigService } from './MongooseConfigService';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
      inject: [ConfigService],
    }),
  ],
  providers: [MongooseConfigService],
})
export class DatabaseModule {}
