import { Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Sponsors } from './entities/sponsors.entity';
import { FilterQuery, Model, PaginateModel, PaginateOptions } from 'mongoose';
import { TenantDto } from './dto/find-all.dto';
import { SearchWithPaginationDto } from 'shared-sdk';
import { FindOneDto } from './dto/find-one.dto';
import { CreateSponsorsDto } from './dto/create-sponsor.dto';
import { UpdateSponsorsDto } from './dto/update-sponsors.dto';


@Injectable()
export class SponsorsService {
    constructor(
        @InjectModel(Sponsors.name)
        private readonly sponsorsModel: Model<Sponsors>,
        @InjectModel(Sponsors.name)
        private readonly sponsorsPaginateModel: PaginateModel<Sponsors>,
    ){}

    findAll(data: TenantDto, pagination: SearchWithPaginationDto) {
        const filters : FilterQuery<Sponsors> = {
            tenant: data.tenant
        }
        if(pagination?.search){
            filters.name = new RegExp(pagination.search, 'i')
        }
        filters.isDeleted = false

        const {offset, limit} = pagination

        const options: PaginateOptions = {
            sort: '-createdAt',
            page: offset, 
            limit,
            select: '-__v -isDeleted',
            customLabels: {meta: 'paginator', docs: 'data'},
            
        }
        return this.sponsorsPaginateModel.paginate(filters, options)
    }

    findOne (id: string) {
        return this.sponsorsModel.findOne({_id: id, isDeleted: false})
    }

    create(data: CreateSponsorsDto) {
        return this.sponsorsModel.create(data)
    }
    update(@Param() params: FindOneDto, data: UpdateSponsorsDto) {
        return this.sponsorsModel.findByIdAndUpdate({_id: params.id, tenant: params.id, }, data, {new: true})
    }
   delete(params: FindOneDto) {
    return this.sponsorsModel.findByIdAndUpdate({_id: params.id, tenant: params.tenant}, {isDeleted: true})
   }
}
