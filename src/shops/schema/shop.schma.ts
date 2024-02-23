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

    @Prop({ default: null })
    loanMoney: number | null;

    @Prop({ required: true })
    photoURL: string

    @Prop({ type: SchemaTypes.ObjectId, ref: 'User', immutable: true })
    createdBy: Types.ObjectId

    @Prop({
        type: Map<string, number>, default:
        {
            USD: 0,
            KES: 1,
            UGX: 0
        }

    })
    buyingRate: { USD: number, KES: number, UGX: number }

    @Prop({
        type: Map<string, number>, default:
        {
            USD: 0,
            KES: 1,
            UGX: 0
        }

    })
    sellingRate: { USD: number, KES: number, UGX: number }

    @Prop({
        type: String, default: "KES"
    })
    baseCurrency: string


}

export const ShopSchema = SchemaFactory.createForClass(Shop);