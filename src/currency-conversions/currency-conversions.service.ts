import { HttpException, Injectable } from '@nestjs/common';
import { CreateCurrencyConversionDto } from './dto/create-currency-conversion.dto';
import { UpdateCurrencyConversionDto } from './dto/update-currency-conversion.dto';
import PaginationQueryType from 'src/types/paginationQuery';
import { JwtPayload } from 'src/types/jwt-payload';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { CurrencyConversion } from './schema/currency-conversion.schema';
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

      const transactionSession = await this.connection.startSession();
      transactionSession.startTransaction();
      const transaction = await this.currencyConversionModel.create({
        ...createCurrencyConversionDto,
        createdBy: user._id,
      });


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
        { session: transactionSession },
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
        { session: transactionSession },
      );
      await transactionSession.endSession();
      return transaction;
    } catch (error) {
      throw new HttpException(error.message, error.status);

    }


    return 'This action adds a new currencyConversion';
  }

  findAll(
    user: JwtPayload,
    query: PaginationQueryType,
    filters: { trasactionType?: string; createdBy?: string },
  ) {
    return `This action returns all currencyConversions`;
  }

  findOne(id: string, user: JwtPayload) {
    return `This action returns a #${id} currencyConversion`;
  }

  update(
    id: string,
    updateCurrencyConversionDto: UpdateCurrencyConversionDto,
    user: JwtPayload,
  ) {
    return `This action updates a #${id} currencyConversion`;
  }

  remove(id: string, user: JwtPayload) {
    return `This action removes a #${id} currencyConversion`;
  }
}
