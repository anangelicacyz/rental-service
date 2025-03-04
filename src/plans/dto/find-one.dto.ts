import { IsString, IsNotEmpty } from 'class-validator';
import { TenantDto } from './find-all.dto';

export class FindOneDto extends TenantDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
