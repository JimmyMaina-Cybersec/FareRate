import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type MobileMoneyProviderDocument = HydratedDocument<MobileMoneyProvider>;

@Schema({ timestamps: true })
export class MobileMoneyProvider {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    currency: string;

    @Prop({ required: false, default: 'active' })
    status: string;

}

export const MobileMoneyProviderSchema = SchemaFactory.createForClass(MobileMoneyProvider);


