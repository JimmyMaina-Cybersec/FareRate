import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Loan extends Document {
  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  idNo: string;

  @Prop({ required: true })
  phoneNo: string;

  @Prop({ default: Date.now })
  dateOfIssue: Date;

  @Prop({ required: true })
  user: string;

  @Prop({ required: true })
  shop: string;
}

export const LoanSchema = SchemaFactory.createForClass(Loan);
