import { Injectable } from '@nestjs/common';
import { TenantDto } from './dto/find-all.dto';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Plans } from './entities/plans.entity';
import { CreatePlansDto } from './dto/create-plans.dto';
import { UpdatePlansDto } from './dto/update-plans.dto';
import { FindOneDto, PaginationDto, SearchWithPaginationDto } from 'shared-sdk';
import { PaginateModel, PaginateOptions } from 'mongoose';

@Injectable()
export class PlansService {
  constructor(
    @InjectModel(Plans.name)
    private readonly plansModel: Model<Plans>,
    @InjectModel(Plans.name)
    private readonly plansPaginateModel: PaginateModel<Plans>,
  ) {}

  findAll(data: TenantDto, pagination: SearchWithPaginationDto) {
    const filters : FilterQuery<Plans> = { 
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
      select: '-__v -isDeleted' ,
      customLabels: { meta: 'paginator', docs: 'data' },
    };
    
    return this.plansPaginateModel.paginate(filters, options)
  }

  findOne(id: string) {
    return this.plansModel.findOne({ _id: id, isDeleted: false });
  }

  create(data: CreatePlansDto) {
    return this.plansModel.create(data);
  }

  Update(params: FindOneDto, data: UpdatePlansDto) {
    return this.plansModel.findByIdAndUpdate({_id: params.id, tenant: params.tenant}, data, { new: true });
  }

  delete(params: FindOneDto) {
    return this.plansModel.findByIdAndUpdate(
      {_id: params.id, tenant: params.tenant},
      { isDeleted: true },
      { new: true },
    );
  }
}
