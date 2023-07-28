import { Module } from '@nestjs/common';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Loan, LoanSchema } from './entities/loan.entity';
import { Installment, InstallmentSchema } from './entities/installment.entity';
import { Shop, ShopSchema } from '../shops/schema/shop.schma';
import { Loanee, LoaneeSchema } from '../loanees/entities/loanee.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Loan.name, schema: LoanSchema },
      { name: Installment.name, schema: InstallmentSchema },
      { name: Shop.name, schema: ShopSchema },
      { name: Loanee.name, schema: LoaneeSchema },
    ]),
  ],
  controllers: [LoansController],
  providers: [LoansService],
})
export class LoansModule {}
