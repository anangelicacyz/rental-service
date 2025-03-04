import { IsMongoId, IsNotEmpty, IsString } from "class-validator"
import { Plans } from "src/plans/entities/plans.entity"
import { Vehicles } from "src/vehicles/entities/vehicles.entity"

export class CreateRentalsDto {
    @IsMongoId()
    @IsNotEmpty()
    plans: Plans
    
    
    vehicles: Vehicles
    
    
    userId: string
    
    
    customer?: object 
    
    
    startDate: Date
    
    
    value: string
    
    
    isDelete: boolean
    
    tenant: string
}

