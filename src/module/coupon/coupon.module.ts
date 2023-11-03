import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [CouponController],
  providers: [CouponService, PrismaService],
})
export class CouponModule {}
