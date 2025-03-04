import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserBy } from 'shared-sdk';
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Schema({ timestamps: true })
export class Plans extends Document {
  @Prop({ type: String })
  tenant: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: Date, required: false })
  startDate?: Date;

  @Prop({ type: Date, required: false })
  endDate?: Date;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: Number })
  daysIncluded: number;

  @Prop({ type: Boolean, default: true })
  active: boolean;

  @Prop({ type: String })
  vehiclesType: string;

  @Prop({type: UserBy})
  createdBy: UserBy;

  @Prop({type: UserBy})
  updatedBy: UserBy;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
}
export const PlansSchema = SchemaFactory.createForClass(Plans);

PlansSchema.plugin(mongoosePaginate)

export const FeaturePlans = {
  name: Plans.name,
  schema: PlansSchema,
};
