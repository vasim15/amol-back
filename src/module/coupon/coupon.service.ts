import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateCoupon } from 'src/dto/coupon.dto';

@Injectable()
export class CouponService {
  constructor(private prisma: PrismaService) {}

  // create a new Coupon
  createCoupon(coupon: CreateCoupon) {
    return this.prisma.coupon.create({
      data: coupon,
    });
  }
  // get all coupons
  getAllCoupons() {
    return this.prisma.coupon.findMany({});
  }

  // delete coupon
  deleteCoupon(id: string) {
    return this.prisma.coupon.delete({
      where: {
        id: id,
      },
    });
  }
}
