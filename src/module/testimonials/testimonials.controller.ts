import { ApiTags } from '@nestjs/swagger';
import { TestimonialServices } from './testimonials.service';
import { Body, Controller, Get, Delete, Post, Put, Param } from '@nestjs/common';
@Controller('testimonial')
@ApiTags('Testimonial')
export class TestimonialController {
  constructor(private testimonialService: TestimonialServices) {}

  // Get all testimonial
  @Get('all')
  getAllTestimonial() {
    return this.testimonialService.getAllTestimonial();
  }

  // get specific testimonial
  @Get(':id')
  getSpecificTestimonial(@Param('id') testimonialId: string) {
    return 'dfhjfsd';
  }

  // create new testimonial
  @Post('create')
  createTestimonial(@Body() testimonial: any) {
    return this.testimonialService.createTestimonial(testimonial);
  }

  // Delete  Book Id
  @Delete(':testimonialId')
  removeBook(@Param('testimonialId') testimonialId: string) {
    return this.testimonialService.removeTestimonial(testimonialId);
  }

  // Update via ID
  //   @Put(':id')
  //   updateBook(@Param('id') id: string, @Body() testimonialData: any) {
  //     return this.testimonialService.updateTestimonial(id, testimonialData);
  //   }
}
