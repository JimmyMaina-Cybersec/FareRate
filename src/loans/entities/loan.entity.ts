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
  agentId: string;

  @Prop({ required: true })
  shopId: string;
}

export const LoanSchema = SchemaFactory.createForClass(Loan);
