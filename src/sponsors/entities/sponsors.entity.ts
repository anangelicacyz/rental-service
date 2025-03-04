
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserBy } from "shared-sdk";
import { Document } from "mongoose";
import * as mongoosePaginate from 'mongoose-paginate-v2';


@Schema({timestamps: true, collection: 'sponsors'})
export class Sponsors extends Document{
    @Prop({type: String})
    tenant: string

    @Prop({type: String})
    name: string

    @Prop({type: String})
    phone?: string

    @Prop({type: String})
    email?: string

    @Prop({type: UserBy})
    createdBy: UserBy;

    @Prop({type: UserBy})
    updatedBy: UserBy;

    @Prop({ type: Boolean, default: false })
    isDeleted: boolean;
}
export const SponsorsSchema = SchemaFactory.createForClass(Sponsors)

SponsorsSchema.plugin(mongoosePaginate)

export const FeatureSponsors = {
    name: Sponsors.name,
    schema: SponsorsSchema
}