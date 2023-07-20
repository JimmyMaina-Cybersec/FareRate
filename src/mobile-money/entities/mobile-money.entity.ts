import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type MobileMoneyDocument = HydratedDocument<MobileMoney>;

@Schema({ timestamps: true })
export class MobileMoney {
    @Prop({ required: true })
    assignedAmount: number;

    @Prop({ default: null })
    closingAmount: number;

    @Prop({ default: null })
    agentClosingAmount: number;

    @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User' })
    agent: Types.ObjectId;

    @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User' })
    assingnedBy: Types.ObjectId;

    // status: open, closed, agent closed, rejected
    @Prop({ default: 'open' })
    status: string;

    @Prop({ type: Date, default: null })
    closedAt: Date;


    @Prop({ type: Date, default: null })
    agentClosedAt: Date;

    @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Shop' })
    shop: Types.ObjectId;

    @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'MobileMoneyProvider' })
    provider: Types.ObjectId;
}

export const MobileMoneySchema = SchemaFactory.createForClass(MobileMoney);
