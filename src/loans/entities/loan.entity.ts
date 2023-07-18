import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';


export type LoanDocument = HydratedDocument<Loan>
@Schema({ timestamps: true })
export class Loan extends Document {
  @Prop({ required: true })
  totalLoan: number;

  @Prop({ required: true })
  balance: number;

  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  customerIdNo: string;

  @Prop({ required: true })
  customerPhone: string;

  @Prop({ default: null })
  customerPhotoURL: string;

  @Prop({ default: 'unpaid' })
  status: string;

  @Prop({ default: Date.now })
  dateOfIssue: Date;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Shop' })
  shop: Types.ObjectId;

  @Prop({ default: [], type: [{ type: SchemaTypes.ObjectId, ref: 'Installment' }] })
  installments: Types.ObjectId[];


}

export const LoanSchema = SchemaFactory.createForClass(Loan);
