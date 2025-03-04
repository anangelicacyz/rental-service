import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { PlansService } from './plans.service';
import { TenantDto } from './dto/find-all.dto';
import { FindOneDto} from './dto/find-one.dto';
import { CreatePlansDto } from './dto/create-plans.dto';
import { CurrentUser, SearchWithPaginationDto, User, userByAdapter } from 'shared-sdk';
import { UpdatePlansDto } from './dto/update-plans.dto';

// import { CurrentUser, User, userByAdapter } from 'shared-sdk';


@Controller(':tenant/plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  /**
   * CRUD
   */

  @Get()
  findAll(@Param() data: TenantDto, @Query() pagination: SearchWithPaginationDto) {
    return this.plansService.findAll(data, pagination);
  }

  @Get(':id')
  findOne(@Param() data: FindOneDto) {
    return this.plansService.findOne(data.id);
  }

  @Post()
  create(@Param() param: TenantDto, @Body() data: CreatePlansDto, @CurrentUser() user: User) {
    data.tenant = param.tenant;
    data.createdBy = userByAdapter(user)

    console.log(data, 'data');

    return this.plansService.create(data);
  }

  @Put(':id')
  Update(@Param() params: FindOneDto, @Body() data: UpdatePlansDto, @CurrentUser() user: User) {
    
    console.log(data, 'data');
    return this.plansService.Update(params, data)
  }

  @Delete(':id')
  delete(@Param() params: FindOneDto, @CurrentUser() user: User) {
    console.log('Successfull deleted')
    return this.plansService.delete(params)
  }
}
