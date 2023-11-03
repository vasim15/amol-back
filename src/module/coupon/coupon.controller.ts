import { Body, Controller, Post, Get, Delete, Param } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCoupon } from 'src/dto/coupon.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Coupon')
@Controller('coupon')
export class CouponController {
  constructor(private couponService: CouponService) {}

  // Create a new coupon
  @Post('create')
  createCoupon(@Body() coupon: CreateCoupon) {
    return this.couponService.createCoupon(coupon);
  }

  // Get all coupon
  @Get('all')
  getAllCoupons() {
    return this.couponService.getAllCoupons();
  }

  // Delete all coupon
  @Delete(':couponId')
  deleteCoupon(@Param('couponId') couponId: string) {
    return this.couponService.deleteCoupon(couponId);
  }
}
