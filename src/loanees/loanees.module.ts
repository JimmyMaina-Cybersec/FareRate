import { Module } from '@nestjs/common';
import { LoaneesService } from './loanees.service';
import { LoaneesController } from './loanees.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Loanee, LoaneeSchema } from './entities/loanee.entity';

@Module({
  controllers: [LoaneesController],
  providers: [LoaneesService],
  imports: [
    MongooseModule.forFeature([
      { name: Loanee.name, schema: LoaneeSchema },
    ]),
  ],
})
export class LoaneesModule { }
