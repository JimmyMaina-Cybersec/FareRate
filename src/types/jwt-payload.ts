/* eslint-disable prettier/prettier */
import { ObjectId } from 'mongodb';
// import { Types } from 'mongoose';
// import { Permission } from './permission';

export class JwtPayload {
  _id: ObjectId | string;
  firstName: string;
  lastName: string;
  idNo: string;
  phone: string;
  email: string;
  shop: ObjectId | string;
  photoURL: string;
  role:
    | 'super user'
    | 'admin'
    | 'service agent'
    | 'accountant';
  // permissions: Permission;
}
