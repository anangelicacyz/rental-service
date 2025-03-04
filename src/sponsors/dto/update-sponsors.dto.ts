import {  IsEmail, IsOptional, IsString } from "class-validator";
import { UserBy } from "shared-sdk";


export class UpdateSponsorsDto {
    @IsOptional()
    @IsString()
    name?: string
    
    @IsOptional()
    @IsString()
    phone?: string
    
    @IsOptional()
    @IsEmail()
    email?: string
        
    updatedBy: UserBy;

}

