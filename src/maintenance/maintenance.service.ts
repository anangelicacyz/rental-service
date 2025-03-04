import { Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Maintenance } from './entities/maintenance.entity';
import { FilterQuery, Model, PaginateModel, PaginateOptions } from 'mongoose';
import { TenantDto } from './dto/find-all.dto';
import {  SearchWithPaginationDto } from 'shared-sdk';
import { FindOneDto } from './dto/find-one.dto';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';

@Injectable()
export class MaintenanceService {
    constructor(
        @InjectModel(Maintenance.name)
        private readonly maintenanceModel: Model <Maintenance>,
        @InjectModel(Maintenance.name)
        private readonly maintenancePaginatorModel: PaginateModel <Maintenance>
    ){}
    findAll (data: TenantDto, pagination: SearchWithPaginationDto) {
        const filters : FilterQuery<Maintenance> = {
            tenant: data.tenant
        }
        if(pagination?.search){
            filters.description = new RegExp(pagination.search, 'i')
        }
        filters.isDeleted = false

        const {offset, limit} = pagination

        const options: PaginateOptions = {
            sort: '-createdAt',
            page: offset, limit,
            select: '-__v -isDeleted',
            customLabels: {meta: 'paginator', docs: 'data'},
            populate: {path: 'vehicle', select: 'description brand year' }
        }
       return this.maintenancePaginatorModel.paginate( filters, options)
    }

    findOne (id: string) {
        return this.maintenanceModel.findOne({
            _id: id, isDeleted: false
        }).populate({path: 'vehicle', select: 'description brand year'})
    }
    create (data: CreateMaintenanceDto ) {
        return this.maintenanceModel.create(data)
    }
    update (params: FindOneDto, data: UpdateMaintenanceDto) {
        return this.maintenanceModel.findOneAndUpdate(
            {_id: params.id, tenant: params.tenant},
            data,
            {new: true}
        )
    }
    delete (params : FindOneDto) {
        return this.maintenanceModel.findOneAndUpdate(
            {_id: params.id, tenant: params.tenant},
            {isDeleted: true}
        )
    }
}
