import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCurrencyConversionDto } from './dto/create-currency-conversion.dto';
import { UpdateCurrencyConversionDto } from './dto/update-currency-conversion.dto';
import PaginationQueryType from 'src/types/paginationQuery';
import { JwtPayload } from 'src/types/jwt-payload';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { CurrencyConversion, CurrencyConversionDocument } from './schema/currency-conversion.schema';
import { Connection, Model } from 'mongoose';
import { Float, FloatDocument } from 'src/float/schma/float.schema';

@Injectable()
export class CurrencyConversionsService {
  constructor(
    @InjectModel(CurrencyConversion.name)
    private readonly currencyConversionModel: Model<CurrencyConversion>,

    @InjectModel(Float.name)
    private readonly floatModel: Model<FloatDocument>,

    @InjectConnection() private readonly connection: Connection,
  ) { }

  async create(
    createCurrencyConversionDto: CreateCurrencyConversionDto,
    user: JwtPayload,
  ) {

    try {


      const transaction = await this.currencyConversionModel.create({
        ...createCurrencyConversionDto,
        createdBy: user._id,
      },);


      const init = await this.floatModel.findOneAndUpdate(
        {
          currency: createCurrencyConversionDto.initialCurrency,
          serviceAgent: user._id,
          status: 'active',
        },);

      if (init.currentAmount < createCurrencyConversionDto.initialAmount) {
        throw new HttpException('Insufficient funds', HttpStatus.BAD_REQUEST);
      }


      await this.floatModel.findOneAndUpdate(
        {
          currency: createCurrencyConversionDto.initialCurrency,
          serviceAgent: user._id,
          status: 'active',
        },
        {
          $inc: {
            currentAmount: -createCurrencyConversionDto.initialAmount,
          },
        },

      );
      await this.floatModel.findOneAndUpdate(
        {
          currency: createCurrencyConversionDto.finalCurrency,
          serviceAgent: user._id,
          status: 'active',
        },
        {
          $inc: {
            currentAmount: createCurrencyConversionDto.finalAmount,
          },
        },
      );

      return transaction;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(
    user: JwtPayload,
    query: PaginationQueryType,
    filters: { trasactionType?: String; createdBy?: string },
  ): Promise<{
    data: CurrencyConversionDocument[];
    page: number,
    resPerPage: number,
    numberOfPages: number
  }> {
    const currentPage = query.page ?? 1;
    const resPerPage = query.resPerPage ?? 20;
    const skip = (currentPage - 1) * resPerPage;

    if (user.role == 'admin' || user.role == 'super user') {

      const numberOfFloating = await this.currencyConversionModel.countDocuments({ ...filters });
      if (numberOfFloating <= 0) {
        throw new HttpException('No users found', HttpStatus.NOT_FOUND);
      }

      const numberOfPages = Math.ceil(numberOfFloating / resPerPage);

      const currencyConversion: CurrencyConversionDocument[] = await this.currencyConversionModel.find(
        { ...filters },
      ).select('-__v').limit(resPerPage).skip(skip).exec()
      return {
        data: currencyConversion,
        page: currentPage,
        resPerPage: resPerPage,
        numberOfPages: numberOfPages
      }
    }
    throw new UnauthorizedException('You are not authorized to perform this action');
  }

  // findOne(id: string, user: JwtPayload) {
  //   return `This action returns a #${id} currencyConversion`;
  // }

  // update(
  //   id: string,
  //   updateCurrencyConversionDto: UpdateCurrencyConversionDto,
  //   user: JwtPayload,
  // ) {
  //   return `This action updates a #${id} currencyConversion`;
  // }

  // remove(id: string, user: JwtPayload) {
  //   return `This action removes a #${id} currencyConversion`;
  // }
}
