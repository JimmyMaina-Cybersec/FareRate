import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';


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

}

export const ShopSchema = SchemaFactory.createForClass(Shop);