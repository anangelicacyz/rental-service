import { IsNotEmpty, IsString } from "class-validator"

export class TenantDto {
    @IsString()
    @IsNotEmpty()
    tenant: string
}