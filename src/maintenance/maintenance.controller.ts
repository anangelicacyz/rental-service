import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { CurrentUser, SearchWithPaginationDto, User, userByAdapter } from 'shared-sdk';
import { FindOneDto } from './dto/find-one.dto';
import { TenantDto } from './dto/find-all.dto';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';

@Controller(':tenant/maintenance')
export class MaintenanceController {
    constructor (private readonly MaintenanceService: MaintenanceService) {}
    
    @Get()
    findAll(@Param() data: TenantDto, @Query() pagination: SearchWithPaginationDto){
        return this.MaintenanceService.findAll(data, pagination)
    }
    @Get(':id')
    findOne (@Param() data: FindOneDto ) {
        return this.MaintenanceService.findOne(data.id)
    }
    @Post()
    create (@Param() param: TenantDto, @Body() data: CreateMaintenanceDto, @CurrentUser() user: User ) {
        data.tenant = param.tenant
        data.createdBy = userByAdapter(user)
        return this.MaintenanceService.create(data)
    }
    @Put(':id')
    update (@Param() params: FindOneDto, @Body() data: UpdateMaintenanceDto, @CurrentUser() user: User) {
       data.updatedBy = user
        return this.MaintenanceService.update(params, data)
    }
    @Delete(':id')
    delete (@Param() params: FindOneDto, @CurrentUser() user: User) {
        return this.MaintenanceService.delete(params)
    }
}
