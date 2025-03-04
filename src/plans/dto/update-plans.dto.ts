'use strict'
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { IUserBy } from "shared-sdk";

export class UpdatePlansDto{
    @IsOptional()
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
  
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type(()=> Number)
    price: number;
  
    @IsOptional()
    @IsNumber()
    @Type(()=> Number)
    daysIncluded: number;
    
    @IsBoolean()
    @IsOptional()
    @Type(()=> Boolean)
    active: boolean;
  
    @IsString()
    @IsOptional()
    vehiclesType: string;
  
    createdBy: IUserBy

    updatedBy: IUserBy
  
    tenant: string;
}