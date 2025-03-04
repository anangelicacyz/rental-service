import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Vehicles } from 'src/vehicles/entities/vehicles.entity'
import * as moongosePaginate from 'mongoose-paginate-v2'
import * as moongoose from 'mongoose'
import { UserBy } from 'shared-sdk'

@Schema({ timestamps: true })
export class Maintenance extends Document{
    @Prop({ type: String, required: true })
    tenant: string

    @Prop({ type: String, required:true })
    description: string

    @Prop({ type: Number})
    cost?: number

    @Prop({ type: Date})
    scheduleDate?: Date

    @Prop({ type: Date})
    startTime?: Date

    @Prop({ type: Date})
    endTime?: Date

    @Prop({ type: Number})
    mileage?: number

    @Prop({ type: moongoose.Schema.Types.ObjectId, required: true, ref: Vehicles.name })
    vehicle: Vehicles

    @Prop({type: UserBy})
    createdBy: UserBy

    @Prop({type: UserBy})
    updatedBy: UserBy

    @Prop({ type: Boolean, default: false })
    isDeleted: boolean
}

export const maintenanceSchema = SchemaFactory.createForClass(Maintenance)

maintenanceSchema.plugin(moongosePaginate)

export const FeatureMaintenance = {
    name: Maintenance.name,
    schema: maintenanceSchema
}