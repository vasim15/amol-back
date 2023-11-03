import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './module/books/books.module';
import { UserModule } from './module/users/users.module';
import { AuthModule } from './module/auth/auth.module';
import { InstituteModule } from './module/institue/institute.module';
import { CouponModule } from './module/coupon/coupon.module';
// import { ProductModule } from './module/product/product.module';
import { CacheModule } from '@nestjs/cache-manager';
import { CourseModule } from './module/course/course.module';
import { StaticPageModule } from './module/static/static.module';
import { QuestionBankModule } from './module/questionsBank/question.module';
import { CartModule } from './module/cart/cart.module';
import { ContestModule } from './module/contest/contest.module';
import { TestimonialModule } from './module/testimonials/testimonials.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT } from './constant/role';
import { CounselingModule } from './module/counseling/counseling.module';
@Module({
  imports: [
    BooksModule,
    UserModule,
    AuthModule,
    InstituteModule,
    CouponModule,
    CourseModule,
    CounselingModule,
    StaticPageModule,
    QuestionBankModule,
    CartModule,
    ContestModule,
    TestimonialModule,
    //cache Module

    CacheModule.register({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
