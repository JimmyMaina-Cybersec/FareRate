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
import { UpdateLoanDto } from './dto/update-loan.dto';

@UseGuards(JwtAuthGuard)
@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) { }

  @Post('new-loan')
  create(
    @Body() createLoanDto: CreateLoanDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.loansService.create(createLoanDto, user);
  }

  @Get()
  findAll(@Query() filters: { shop?: String; agent?: string, page: number, resPerPage: number }, @CurrentUser() user: JwtPayload) {
    return this.loansService.findAll(user, filters);
  }

  @Get(':idNo')
  findPendingLoansByIdNo(@Param('idNo') idNo: string,) {
    return this.loansService.findPendingLoansByIdNo(idNo);
  }

  @Patch('pay/:id')
  update(@Param('id') loanId: string, @Body() updateLoanBody: UpdateLoanDto, @CurrentUser() user: JwtPayload) {
    return this.loansService.update(loanId, updateLoanBody, user);
  }
}
