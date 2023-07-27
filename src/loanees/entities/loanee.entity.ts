import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';


export type LoaneeDocument = HydratedDocument<Loanee>

@Schema({ timestamps: true })
export class Loanee {

    @Prop({ required: true })
    customerFirstName: string;

    @Prop({ required: true })
    customerLastName: string;

    @Prop({ required: true })
    customerIdNo: string;

    @Prop({ required: true })
    customerPhone: string;

    @Prop({ default: null })
    totalBalance: number;

    @Prop({ required: true })
    photoURL: string;

    @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User' })
    createdBy: Types.ObjectId;


}

export const LoaneeSchema = SchemaFactory.createForClass(Loanee);
