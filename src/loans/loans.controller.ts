import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/types/jwt-payload';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  create(
    @Body() createLoanDto: CreateLoanDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.loansService.create(createLoanDto, user);
  }

  @Get()
  findAll() {
    return this.loansService.findAll();
  }

  @Get('search')
  findPendingLoansByIdNo(@Query('idNo') idNo: string) {
    return this.loansService.findPendingLoansByIdNo(idNo);
  }

  @Patch(':id/pay')
  update(@Param('id') id: string, @Body('amount') amount: number) {
    return this.loansService.update(id, amount);
  }
}
