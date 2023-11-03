import { IsNotEmpty, IsNumber, IsDateString, IsEnum, IsOptional } from 'class-validator';
import { CouponTargetType } from 'src/type';

export class CreateCoupon {
  @IsNotEmpty({ message: 'Coupon code is required.' })
  code: string;

  @IsNotEmpty({ message: 'Discount value is required.' })
  @IsNumber({}, { message: 'Discount must be a number.' })
  discount: number;

  @IsNotEmpty({ message: 'Target type is required.' })
  @IsEnum(CouponTargetType, { message: 'Invalid coupon target type.' })
  targetType: CouponTargetType;

  @IsOptional()
  targetId: string;

  @IsNotEmpty({ message: 'Expiration date is required.' })
  @IsDateString({}, { message: 'Invalid expiration date.' })
  expiration: string;
}
