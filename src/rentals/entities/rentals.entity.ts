'use strict'

import { Schema, Prop, SchemaFactory} from '@nestjs/mongoose'
import mongoose from 'mongoose'
import * as mongoosePaginate from 'mongoose-paginate-v2'
import { Plans } from 'src/plans/entities/plans.entity'
import { Vehicles } from 'src/vehicles/entities/vehicles.entity'

@Schema({timestamps: true})
export class Rentals extends Document{
    @Prop({type: String, required: true})
    tenant: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: Plans.name, required: true})
    plans: Plans

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: Vehicles.name, required: true})
    vehicles: Vehicles

    @Prop({type: String, required: true})
    userId: string

    @Prop({type: Object})
    customer?: object 

    @Prop({type: Date, required: true})
    startDate: Date

    @Prop({type: Number, required: true })
    value: string

    @Prop({type: Boolean, default: false})
    isDelete: boolean
}

export const rentalsEntity = SchemaFactory.createForClass(Rentals)

