import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TestimonialServices {
  constructor(private prisma: PrismaService) {}

  //create new testimonial
  async createTestimonial(data: any) {
    const testimonialData = await this.prisma.testimonials.create({
      data: data,
    });
    return testimonialData;
  }
  // get All testimonial
  async getAllTestimonial() {
    return await this.prisma.testimonials.findMany();
  }

  async removeTestimonial(id: string) {
    return await this.prisma.testimonials.delete({
      where: { id: id },
    });
  }
  updateTestimonial() {
    return 'dfghsd';
  }
}
