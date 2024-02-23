import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type InstallmentDocument = HydratedDocument<Installment>;

@Schema({ timestamps: true })
export class Installment {
  @Prop({ required: true })
  amountPaid: number;

  @Prop({ required: true })
  remainingDebt: number;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Loan' })
  loan: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Shop' })
  shop: Types.ObjectId;
}

export const InstallmentSchema = SchemaFactory.createForClass(Installment);
