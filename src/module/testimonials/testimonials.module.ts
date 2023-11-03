import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TestimonialController } from './testimonials.controller';
import { TestimonialServices } from './testimonials.service';

@Module({
  providers: [TestimonialServices, PrismaService],
  controllers: [TestimonialController],
})
export class TestimonialModule {}
