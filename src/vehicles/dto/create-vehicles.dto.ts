'use strict';

import {
  IsArray,
  IsBoolean,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IUserBy } from 'shared-sdk';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  plate?: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  carModel?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(1990)
  year?: number;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  available?: boolean;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  taxDate?: Date;

  @IsString()
  @IsNotEmpty()
  vehicleType: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  monthlyCost?: number;

  @IsString()
  @IsMongoId()
  @IsOptional()
  sponsor?: string;

  @IsString()
  @IsArray()
  @IsOptional()
  documents?: string[];

  @IsString()
  @IsOptional()
  airTag?: string;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  gps?: boolean;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  gpsSimcardNumber?: number;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  imageUrls?: string[];

  createdBy: IUserBy;

  tenant: string;
}
