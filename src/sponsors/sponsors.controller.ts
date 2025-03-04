import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { SponsorsService } from './sponsors.service';
import { TenantDto } from './dto/find-all.dto';
import { CurrentUser, SearchWithPaginationDto, User, userByAdapter } from 'shared-sdk';
import { FindOneDto } from './dto/find-one.dto';
import { CreateSponsorsDto } from './dto/create-sponsor.dto';
import { UpdateSponsorsDto } from './dto/update-sponsors.dto';

@Controller(':tenant/sponsors')
export class SponsorsController {
    constructor( private readonly sponsorsService: SponsorsService){}

    @Get()
    findAll(@Param() data: TenantDto, @Query() pagination: SearchWithPaginationDto ){
        return this.sponsorsService.findAll(data, pagination)
    }
    @Get(':id')
    findOne (@Param() data: FindOneDto) {
        return this.sponsorsService.findOne(data.id)
    }
    @Post()
    create (@Param() param: TenantDto, @Body() data: CreateSponsorsDto, @CurrentUser() user: User){
        data.tenant= param.tenant
        data.createdBy = userByAdapter(user)

        return this.sponsorsService.create(data)
    }
     @Put(':id') 
    update (@Param() params: FindOneDto, @Body() data: UpdateSponsorsDto, @CurrentUser() user: User) {
        return this.sponsorsService.update(params, data)
    }
    @Delete(':id')
    delete (@Param() params: FindOneDto, @CurrentUser() user: User){
        return this.sponsorsService.delete(params)
    }
}
