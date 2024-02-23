/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  idNo: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop()
  email: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Shop', default: null })
  shop: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', default: null })
  user: Types.ObjectId;

  @Prop({ required: true })
  photoURL: string;

  @Prop({
    required: true,
    lowercase: true,
    enum: ['super user', 'admin', 'service agent', 'accountant'],
  })
  role: 'super user' | 'admin' | 'service agent' | 'accountant';

  @Prop()
  refreshToken: string;

  @Prop()
  password: string;

  @Prop()
  lastlogin: Date;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', immutable: true })
  createdBy: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
