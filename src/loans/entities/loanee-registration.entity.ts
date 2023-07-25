import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type LoaneeDocument = HydratedDocument<Loanee>;
@Schema({ timestamps: true })
export class Loanee {
  @Prop({ required: true, unique: true })
  idNo: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  secondName: string;

  @Prop({ required: true })
  DOB: Date;

  @Prop({ default: null })
  photoURL: string;

  @Prop({ default: null })
  idURL: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;
}

export const LoaneeSchema = SchemaFactory.createForClass(Loanee);
