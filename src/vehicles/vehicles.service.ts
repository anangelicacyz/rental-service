import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Vehicles } from './entities/vehicles.entity';
import { FindOneDto } from './dto/find-one.dto';
import { UpdateVehicleDto } from './dto/update-vehicles.dto';
import { CreateVehicleDto } from './dto/create-vehicles.dto';
import { FilterQuery, Model } from 'mongoose';
import { TenantDto } from './dto/find-all.dto';
import { SearchWithPaginationDto } from 'shared-sdk';
import { PaginateModel, PaginateOptions } from 'mongoose';
import { HuggingFaceService } from 'src/huggingface/huggingface.service';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectModel(Vehicles.name)
    private readonly vehiclesModel: Model<Vehicles>,
    @InjectModel(Vehicles.name)
    private readonly vehiclesPaginateModel: PaginateModel<Vehicles>,
    private readonly huggingFaceService: HuggingFaceService,
  ) {}

  findAll(data: TenantDto, pagination: SearchWithPaginationDto) {
    console.log(pagination);
    const filters: FilterQuery<Vehicles> = {
      tenant: data.tenant,
    };
    if (pagination?.search) {
      filters.description = new RegExp(pagination.search, 'i');
    }
    filters.isDeleted = false;

    const { offset, limit } = pagination;

    const options: PaginateOptions = {
      sort: '-createdAt',
      page: offset,
      limit,
      select: '-__v -isDeleted',
      customLabels: { meta: 'paginator', docs: 'data' },
      populate: { path: 'sponsor', select: 'name phone -_id' },
    };
    return this.vehiclesPaginateModel.paginate(filters, options);
  }
  async create(vehicle: CreateVehicleDto) {
    const newVehicle = await this.vehiclesModel.create(vehicle);
    newVehicle.populate({ path: 'sponsor', select: 'name phone -_id' });

    /**
     * TODO: move to QUEUE to process async and generate embedding even when the service huggingface is down
     */

    let description = `CarBrand: ${vehicle.brand},CarModel: ${vehicle.carModel || 'Modelo no especificado'},Plate: ${vehicle.plate || 'Placa no especificada'}, CarYear: ${vehicle.year ? vehicle.year : 'Año desconocido'}, Type: ${vehicle.vehicleType}, Monthly Cost: $${vehicle.monthlyCost}, GPS: ${vehicle.gps ? 'Enabled' : 'Disabled'}, AirTag: ${vehicle.airTag},  ${vehicle.description}`;
    // add sponsor to description
    if (newVehicle.sponsor) {
      description += `, Sponsor: ${newVehicle.sponsor.name}, Phone: ${newVehicle.sponsor.phone}`;
    }
    console.log('VehiclesService::create::description', description);
    this.huggingFaceService.getEmbedding(description).then((embedding) => {
      newVehicle.embedding_hf = embedding;

      newVehicle.save();
    });
    return newVehicle;
  }
  findOne(id: string) {
    return this.vehiclesModel
      .findOne({
        _id: id,
        isDeleted: false,
      })
      .populate({ path: 'sponsor', select: 'name phone -_id' });
  }

  update(params: FindOneDto, data: UpdateVehicleDto) {
    return this.vehiclesModel.findOneAndUpdate({ _id: params.id, tenant: params.tenant }, data, { new: true });
  }

  delete(params: FindOneDto) {
    return this.vehiclesModel.findByIdAndUpdate(
      { _id: params.id, tenant: params.tenant },
      { isDeleted: true },
      { new: true },
    );
  }

  async searchVehicleAI({ tenant }: TenantDto, query: string) {
    /**
     * Generate Embedding using Hugging Face
     */
    const generate_embedding = await this.huggingFaceService.getEmbedding(query);

    /**
     * apply vector search with Hugging Face Embedding
     */
    const results = await this.vehiclesModel
      .aggregate([
        {
          $vectorSearch: {
            filter: {
              tenant,
            },
            queryVector: generate_embedding,
            path: 'embedding_hf',
            numCandidates: 100,
            limit: 4,
            index: 'vector_index',
          },
        },
        {
          $project: {
            embedding_hf: 0,
          },
        },
      ])
      .exec();

    return results;
  }
}
