import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CurrencyConversionsModule } from './currency-conversions/currency-conversions.module';
import { AuthModule } from './auth/auth.module';
import { FloatModule } from './float/float.module';
import { ShopModule } from './shops/shop.module';
// import { TransactionRateModule } from './transaction-rate/transaction-rate.module';
import { MobileAndBankFloatModule } from './mobile-and-bank-float/mobile-and-bank-float.module';
import { LoansModule } from './loans/loans.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGODB_CONNECTION_STRING,
      }),
    }),
    UsersModule,
    CurrencyConversionsModule,
    AuthModule,
    FloatModule,
    ShopModule,
    MobileAndBankFloatModule,
    LoansModule,
    // TransactionRateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
