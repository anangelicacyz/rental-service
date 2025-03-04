import { Module } from '@nestjs/common';
import { HuggingFaceService } from './huggingface.service';

@Module({
  imports: [],
  controllers: [],
  providers: [HuggingFaceService],
  exports: [HuggingFaceService],
})
export class HuggingfaceModule {}
