import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateMobileMoneyDto } from './dto/create-mobile-money.dto';
import { UpdateMobileMoneyDto } from './dto/update-mobile-money.dto';
import { JwtPayload } from 'src/types/jwt-payload';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MobileMoney } from './entities/mobile-money.entity';
import PaginationQueryType from 'src/types/paginationQuery';

@Injectable()
export class MobileMoneyService {
  constructor(
    @InjectModel(MobileMoney.name)
    private mobileMoneyModel: Model<MobileMoney>,
  ) { }
  create(createMobileMoneyDto: CreateMobileMoneyDto, user: JwtPayload) {
    if (user.role !== 'admin') {
      throw new ForbiddenException('Only admins can create mobile money');
    }

    return this.mobileMoneyModel.create({ ...createMobileMoneyDto, assingnedBy: user._id, shop: user.shop });
  }

  async findAll(user: JwtPayload,
    adminFilters: {
      shop?: string;
      createdBy?: string;
      status?: string
      agent?: string
      _id?: string
      provider?: string
    },
    agentFilters: {
      status?: string
      _id?: string
      provider?: string
    }, paginationQuery: PaginationQueryType) {

    const currentPage = paginationQuery.page ?? 1;
    const resPerPage = paginationQuery.resPerPage ?? 50;
    const skip = (currentPage - 1) * resPerPage;

    if (user.role === 'admin') {
      const numberOfFloating =
        await this.mobileMoneyModel.countDocuments({
          ...adminFilters,
        });
      return {
        data: this.mobileMoneyModel.find({ ...adminFilters })
          .sort({ createdAt: -1 })
          .select('-__v')
          .limit(resPerPage)
          .skip(skip)
          .exec(),

        page: paginationQuery.page ?? 1,
        resPerPage: paginationQuery.resPerPage ?? 20,
        numberOfPages: Math.ceil(numberOfFloating / resPerPage),
      }
    }


    const numberOfFloating =
      await this.mobileMoneyModel.countDocuments({
        agent: user._id,
        ...agentFilters,
      });
    return {
      data: this.mobileMoneyModel.find({ ...agentFilters, agent: user._id })
        .sort({ createdAt: -1 })
        .select('-__v')
        .limit(resPerPage)
        .skip(skip)
        .exec(),

      page: paginationQuery.page ?? 1,
      resPerPage: paginationQuery.resPerPage ?? 20,
      numberOfPages: Math.ceil(numberOfFloating / resPerPage),
    }




  }

  findOne(id: string) {

    return this.mobileMoneyModel.findById(id)
  }

  update(id: string, updateMobileMoneyDto: UpdateMobileMoneyDto, user: JwtPayload) {
    if (user.role == 'admin') {
      return this.mobileMoneyModel.findByIdAndUpdate(id, {
        status: updateMobileMoneyDto.status,
        closingAmount: updateMobileMoneyDto.amount
      }, { new: true })
    }
    return this.mobileMoneyModel.findByIdAndUpdate(id, {
      status: 'awaiting approval',
      agentClosingAmount: updateMobileMoneyDto.amount
    }, {
      new: true
    })
  }

  remove(id: string, user: JwtPayload) {
    if (user.role !== 'admin') return new UnauthorizedException('Onli Admins can delete this service')
    this.mobileMoneyModel.findByIdAndDelete().exec()
    return {
      message: "deleted Successfully"
    }
  }
}
