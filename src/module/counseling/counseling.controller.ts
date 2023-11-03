import { Controller, Post, Delete, Put, Get, Param, Body, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateBookDTO, UpdateBookDTO } from 'src/dto/book.dto';
import { CounselingServices } from './counseling.service';
import { RegisterCounselingDTO } from 'src/dto/counseling.dto';
import { userInfo } from 'os';

@ApiTags('Counseling')
@Controller('counseling')
export class CounselingController {
  constructor(private counselingServices: CounselingServices) {}

  // Get All Counselings
  @Get('all')
  async getAllCounselings(@Query() query: any) {
    return await this.counselingServices.getAllCounselings(query);
  }

  // Create New Counseling
  @Post('create')
  createCounseling(@Body() createCounseling: any) {
    return this.counselingServices.createCounseling(createCounseling);
  }

  // Get via ID
  @Get('/order/:userId')
  getCounselingOfUser(@Param('userId') userId: string) {
    return this.counselingServices.getCounselingOfUser(userId);
  }

  // Update via ID
  @Put(':counselingId')
  updateCounseling(@Param('counselingId') counselingId: string, @Body() counselingData: any) {
    return this.counselingServices.updateCounseling(counselingId, counselingData);
  }

  // Get Counseling via ID
  @Get(':counselingId')
  getCounselingById(@Param('counselingId') counselingId: string) {
    return this.counselingServices.getCounselingById(counselingId);
  }

  @Get('/booking/all')
  getAllCounselingBooking() {
    return this.counselingServices.getAllCounselingBooking();
  }
  // Delete counseling Id
  @Delete(':counselingId')
  removeCounseling(@Param('counselingId') counselingId: string) {
    return this.counselingServices.removeCounseling(counselingId);
  }

  // Enroll Counseling for specific user
  @Post('/enroll/:userId')
  enrollCounseling(@Param('userId') userId: string, @Body() userInfo: any) {
    return this.counselingServices.enrollCounseling(userId, userInfo);
  }

  // Get all counseling enroll by users
  @Get('enroll/:counselingId')
  getCounselingEnrollUsers(@Param('counselingId') counselingId: string) {
    return this.counselingServices.getCounselingEnrollUsers();
  }
}
