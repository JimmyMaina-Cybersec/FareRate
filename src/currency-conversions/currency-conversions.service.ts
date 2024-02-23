import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCurrencyConversionDto } from './dto/create-currency-conversion.dto';
import { JwtPayload } from 'src/types/jwt-payload';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import {
  CurrencyConversion,
  CurrencyConversionDocument,
} from './schema/currency-conversion.schema';
import { Connection, Model } from 'mongoose';
import { Float, FloatDocument } from 'src/float/schma/float.schema';
import PaginationQueryType from '../types/paginationQuery';

@Injectable()
export class CurrencyConversionsService {
  constructor(
    @InjectModel(CurrencyConversion.name)
    private readonly currencyConversionModel: Model<CurrencyConversion>,
    @InjectModel(Float.name)
    private readonly floatModel: Model<FloatDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async create(
    createCurrencyConversionDto: CreateCurrencyConversionDto,
    user: JwtPayload,
  ) {
    try {
      const finCurr = await this.floatModel.findOne({
        currency: createCurrencyConversionDto.finalCurrency,
        serviceAgent: user._id,
        status: 'active',
      });

      console.log(finCurr);

      if (!finCurr) {
        throw new HttpException(
          `${createCurrencyConversionDto.finalCurrency} Float not assigned `,
          HttpStatus.BAD_REQUEST,
        );
      }

      if (
        !finCurr ||
        finCurr.currentAmount < createCurrencyConversionDto.finalAmount
      ) {
        throw new HttpException(
          `Insufficient ${createCurrencyConversionDto.finalCurrency} Float in your till`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const newFloat = await this.floatModel.findOneAndUpdate(
        {
          currency: createCurrencyConversionDto.initialCurrency,
          serviceAgent: user._id,
          status: 'active',
        },
        {
          $inc: {
            currentAmount: createCurrencyConversionDto.initialAmount,
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
            currentAmount: -createCurrencyConversionDto.finalAmount,
          },
        },
      );

      console.log(newFloat);

      const transaction = await this.currencyConversionModel.create({
        ...createCurrencyConversionDto,
        createdBy: user._id,
        agentName: user.firstName + ' ' + user.lastName,
      });

      return transaction;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(
    user: JwtPayload,
    filters: {
      transactionType?: string;
      createdBy?: string;
      page?: number;
      resPerPage?: number;
    },
    paginationQuery: PaginationQueryType,
  ): Promise<{
    data: CurrencyConversionDocument[];
    page: number;
    resPerPage: number;
    numberOfPages: number;
  }> {
    const currentPage = paginationQuery.page ?? 1;
    const resPerPage = paginationQuery.resPerPage ?? 50;
    const skip = (currentPage - 1) * resPerPage;

    if (user.role == 'admin' || user.role == 'super user') {
      delete filters.page;
      delete filters.resPerPage;

      const numberOfFloating =
        await this.currencyConversionModel.countDocuments({
          ...filters,
        });

      const numberOfPages = Math.ceil(numberOfFloating / resPerPage);

      const currencyConversion: CurrencyConversionDocument[] =
        await this.currencyConversionModel
          .find({
            ...filters,
          })
          .sort({ createdAt: -1 })
          .select('-__v')
          .limit(resPerPage)
          .skip(skip)
          .exec();
      return {
        data: currencyConversion,
        page: currentPage,
        resPerPage: resPerPage,
        numberOfPages: numberOfPages,
      };
    }
    throw new UnauthorizedException(
      'You are not authorized to perform this action',
    );
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
