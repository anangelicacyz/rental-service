'use strict'

import { IsNotEmpty, IsString } from "class-validator";
import { TenantDto } from "./find-all.dto";

export class FindOneDto extends TenantDto{
    @IsString()
    @IsNotEmpty()
    id: string
}