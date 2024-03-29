import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type CurrencyConversionDocument = HydratedDocument<CurrencyConversion>;

@Schema({ timestamps: true })
export class CurrencyConversion {
  @Prop({ required: true })
  initialCurrency: string;

  @Prop({ required: true })
  finalCurrency: string;

  @Prop({ required: true })
  initialAmount: number;

  @Prop({ default: null })
  additionalEntries: number[];

  @Prop({ required: true })
  finalAmount: number;

  @Prop({ required: true })
  rate: number;

  @Prop({ default: null })
  transactionType: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Shop' })
  shop: Types.ObjectId;

  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: 'User',
    immutable: true,
  })
  createdBy: Types.ObjectId;

  @Prop({ type: String, default: null })
  agentName: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    default: null,
  })
  updatedBy: Types.ObjectId;

}

export const CurrencyConversionSchema =
  SchemaFactory.createForClass(CurrencyConversion);
