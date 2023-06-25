import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CurrencyConversionsModule } from './currency-conversions/currency-conversions.module';
import { AuthModule } from './auth/auth.module';
import { FloatModule } from './float/float.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb+srv://wekesa350:wekesa350@farerate.pftuk3b.mongodb.net/live?retryWrites=true&w=majority'),
    UsersModule,
    CurrencyConversionsModule,
    AuthModule,
    FloatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
