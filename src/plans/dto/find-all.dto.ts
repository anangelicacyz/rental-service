import { IsString, IsNotEmpty } from 'class-validator';

export class TenantDto {
  @IsString()
  @IsNotEmpty()
  tenant: string;
}
