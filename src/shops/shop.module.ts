import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopSchema } from './schema/shop.schma';

@Module({
  controllers: [ShopController],
  providers: [ShopService],
  imports: [
    MongooseModule.forFeature([{ name: 'Shop', schema: ShopSchema }]),
  ],
})
export class ShopModule { }
