import { Controller, Get, Param, Post, Body, Put, Query, Delete } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicles.dto';
import { UpdateVehicleDto } from './dto/update-vehicles.dto';
import { CurrentUser, SearchWithPaginationDto, User, userByAdapter } from 'shared-sdk';
import { TenantDto } from './dto/find-all.dto';
import { FindOneDto } from './dto/find-one.dto';

@Controller(':tenant/vehicles')
export class VehiclesController {
  constructor(private readonly VehiclesService: VehiclesService) {}

  @Get()
  findAll(@Param() data: TenantDto, @Query() pagination: SearchWithPaginationDto) {
    return this.VehiclesService.findAll(data, pagination);
  }

  @Post()
  createVehicle(@Param() param: TenantDto, @Body() data: CreateVehicleDto, @CurrentUser() user: User) {
    data.tenant = param.tenant;
    data.createdBy = userByAdapter(user);

    return this.VehiclesService.create(data);
  }
  @Get('ai')
  findAllAI(@Param() data: TenantDto, @Query('search') description: string) {
    return this.VehiclesService.searchVehicleAI(data, description);
  }
  @Get(':id')
  findOne(@Param() data: FindOneDto) {
    return this.VehiclesService.findOne(data.id);
  }

  @Put(':id')
  update(@Param() params: FindOneDto, @Body() data: UpdateVehicleDto, @CurrentUser() user: User) {
    data.updatedBy = userByAdapter(user);
    return this.VehiclesService.update(params, data);
  }

  @Delete(':id')
  delete(@Param() params: FindOneDto, @CurrentUser() user: User) {
    console.log('Successfull deleted');
    return this.VehiclesService.delete(params);
  }
}
