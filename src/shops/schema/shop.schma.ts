import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { type } from 'os';


export type ShopDocument = HydratedDocument<Shop>

@Schema({ timestamps: true })
export class Shop {
    @Prop({ required: true, unique: true })
    name: string

    @Prop({ required: true })
    town: string


    @Prop({ required: true })
    country: string

    @Prop({ required: true })
    photoURL: string

    @Prop({ type: SchemaTypes.ObjectId, ref: 'User', immutable: true })
    createdBy: Types.ObjectId

    @Prop({
        type: [{ currency: String, amount: Number }], default: [
            { currency: 'USD', amount: 0 },
            { currency: 'KES', amount: 1 },
            { currency: 'UGX', amount: 0 },
        ]
    })
    rates: { currency: string, amount: number }[]

    @Prop({
        type: String, default: "KES"
    })
    baseCurrency: string


}

export const ShopSchema = SchemaFactory.createForClass(Shop);