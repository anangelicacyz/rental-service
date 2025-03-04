import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";
import { IUserBy } from "shared-sdk";

export class CreatePlansDto {

  @IsNotEmpty()
  @IsString()
  name: string;
 
  @IsDate()
  @IsOptional()
  @Type(()=> Date)
  startDate?: Date;

  @IsDate()
  @IsOptional()
  @Type(()=> Date)
  endDate?: Date;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Type(()=> Number)
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(()=> Number)
  daysIncluded: number;
  
  @IsBoolean()
  @IsOptional()
  @Type(()=> Boolean)
  active: boolean;

  @IsString()
  @IsNotEmpty()
  vehiclesType: string;

  createdBy: IUserBy

  tenant: string;
}
