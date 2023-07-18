/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Installment extends Document {
  @Prop({ required: true })
  amountPaid: number;

  @Prop({ required: true, ref: 'Loan' })
  loan: string;

  @Prop({ required: true })
  user: string;
}

export const InstallmentSchema = SchemaFactory.createForClass(Installment);
