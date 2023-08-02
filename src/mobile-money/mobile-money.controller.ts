import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { MobileMoneyService } from './mobile-money.service';
import { CreateMobileMoneyDto } from './dto/create-mobile-money.dto';
import { UpdateMobileMoneyDto } from './dto/update-mobile-money.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/types/jwt-payload';
import PaginationQueryType from 'src/types/paginationQuery';
import { ReviewDTO } from './dto/review.dto';


@UseGuards(JwtAuthGuard)

@Controller('mobile-money')
export class MobileMoneyController {
  constructor(private readonly mobileMoneyService: MobileMoneyService) { }

  @Post('add')
  create(@Body() createMobileMoneyDto: CreateMobileMoneyDto, @CurrentUser() user: JwtPayload) {
    return this.mobileMoneyService.create(createMobileMoneyDto, user);
  }

  @Get()
  findAll(
    @Query() adminFilters: {
      shop?: string;
      createdBy?: string;
      status?: string
      agent?: string
      _id?: string
      provider?: string
    },
    @Query() agentFilters: {
      status?: string
      _id?: string
      provider?: string
    }, @Query() paginationQuery: PaginationQueryType, @CurrentUser() user: JwtPayload
  ) {
    return this.mobileMoneyService.findAll(
      user,
      adminFilters,
      paginationQuery
    );
  }

  @Get('/my-float')
  findMine(
    @Query() filters: {
      status?: string;
      provider?: string;
    },
    @CurrentUser() user: JwtPayload

  ) {
    return this.mobileMoneyService.findMine(
      user,
      filters,

    );
  }


  @Patch('my-float/review/:id')
  submitForReview(@Param('id') id: string, @Body() updateMobileMoneyDto: UpdateMobileMoneyDto, @CurrentUser() user: JwtPayload) {
    return this.mobileMoneyService.submitForReview(id, updateMobileMoneyDto, user);
  }

  @Patch('review/:id')
  review(@Param('id') id: string, @Body() reviewDTO: ReviewDTO, @CurrentUser() user: JwtPayload) {
    return this.mobileMoneyService.review(id, reviewDTO, user);
  }


  @Get('provider/:id')
  findOne(@Param('id') id: string) {
    return this.mobileMoneyService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateMobileMoneyDto: UpdateMobileMoneyDto, @CurrentUser() user: JwtPayload) {
    return this.mobileMoneyService.update(id, updateMobileMoneyDto, user);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.mobileMoneyService.remove(id, user);
  }
}
