'use strict';

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Sponsors } from 'src/sponsors/entities/sponsors.entity';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import * as moongoose from 'mongoose';

@Schema({ timestamps: true })
export class Vehicles extends Document {
  @Prop({ type: String, required: true })
  tenant: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String })
  plate?: string;

  @Prop({ type: String })
  brand?: string;

  @Prop({ type: String })
  carModel?: string;

  @Prop({ type: Number })
  year?: number;

  @Prop({ type: Boolean, default: true })
  available?: boolean;

  @Prop({ type: Date })
  taxDate?: Date;

  @Prop({ type: String })
  vehicleType: string;

  @Prop({ type: Number })
  monthlyCost?: number;

  @Prop({ type: moongoose.Schema.Types.ObjectId, ref: Sponsors.name })
  sponsor?: Sponsors;

  @Prop({ type: [String] })
  documents?: string[];

  @Prop({ Type: String })
  airTag?: string;

  @Prop({ Type: Boolean, default: false })
  gps?: boolean;

  @Prop({ Type: Number })
  gpsSimcardNumber?: number;

  @Prop({ type: [String] })
  imageUrls?: string[];

  @Prop({ type: [Number], required: false })
  embedding_hf?: number[];

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
}
export const VehiclesSchema = SchemaFactory.createForClass(Vehicles);

VehiclesSchema.plugin(mongoosePaginate);

export const FeatureVehicles = {
  name: Vehicles.name,
  schema: VehiclesSchema,
};
