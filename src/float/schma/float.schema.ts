import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type FloatDocument = HydratedDocument<Float>;

@Schema({ timestamps: true })
export class Float {
  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  currentAmount: number;

  @Prop({ required: true })
  initialmount: number;

  @Prop({ default: 0 })
  addedAmount: number;

  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: 'User',
    immutable: true,
  })
  serviceAgent: Types.ObjectId;

  @Prop({ required: true, default: 'active' })
  status: string;

  @Prop({ type: Date, default: null })
  closedAt: Date;

  @Prop({

    type: SchemaTypes.ObjectId,
    ref: 'User',
    default: null,
  })
  closedBy: Types.ObjectId;

  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: 'User',
    immutable: true,
  })
  createdBy: Types.ObjectId;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    default: null,
  })
  updatedBy: Types.ObjectId;
}

export const FloatSchema = SchemaFactory.createForClass(Float);
