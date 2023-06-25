import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';


export type FloatDocument = HydratedDocument<Float>

@Schema({ timestamps: true })
export class Float {
    @Prop({ required: true })
    currency: string

    @Prop({ required: true })
    amount: number

    @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User', immutable: true })
    serviceAgent: Types.ObjectId

    @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User', immutable: true })
    createdBy: Types.ObjectId
}

export const FloatSchema = SchemaFactory.createForClass(Float);