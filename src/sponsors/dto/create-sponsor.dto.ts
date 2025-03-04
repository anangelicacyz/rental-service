import {  IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserBy } from "shared-sdk";

export class CreateSponsorsDto {
    
    @IsNotEmpty()
    @IsString()
    name: string
    
    @IsOptional()
    @IsString()
    phone?: string
    
    @IsEmail()
    @IsOptional()
    email?: string
    
    createdBy: UserBy;
        
    updatedBy: UserBy;

    tenant: string
}