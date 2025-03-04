import { Type } from "class-transformer"
import { IsDate, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator"
import { IUserBy } from "shared-sdk"

export class UpdateMaintenanceDto {
    
    @IsString()
    @IsOptional()
    description: string
    
    @IsNumber()
    @IsOptional()
    @Min(0)
    @Type(()=> Number)
    cost: number

    @IsDate()
    @IsOptional()
    @Type(()=> Date)
    scheduleDate: Date
    
    @IsDate()
    @IsOptional()
    @Type(()=> Date)
    startTime: Date
    
    @IsDate()
    @IsOptional()
    @Type(()=> Date)
    endTime: Date

    @IsNumber()
    @IsOptional()
    @Type(()=> Number)
    mileage: number

    @IsString()
    @IsMongoId()
    @IsOptional()
    vehicle: string

    createdBy: IUserBy
    
    updatedBy: IUserBy

    tenant: string

}

