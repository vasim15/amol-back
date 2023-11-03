import { Controller, Post, Delete, Put, Get, Param, Body, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateBookDTO, UpdateBookDTO } from 'src/dto/book.dto';
import { CourseServices } from './course.service';
import { CreateCourseDTO, RegisterCourseDTO } from 'src/dto/course.dto';
import { userInfo } from 'os';

@ApiTags('Courses')
@Controller('course')
export class CourseController {
  constructor(private courseServices: CourseServices) {}

  // Get All Courses
  @Get('all')
  async getAllCourses(@Query() query: any) {
    return await this.courseServices.getAllCourses(query);
  }
  // Get  via ID
  @Get(':courseId')
  getBookViaId(@Param('courseId') courseId: string) {
    return this.courseServices.getCourseViaId(courseId);
  }
  // Create New Course
  @Post('create')
  createCourse(@Body() createCourse: any) {
    return this.courseServices.createCourse(createCourse);
  }

  // Delete  course Id
  @Delete(':courseId')
  removeCourse(@Param('courseId') courseId: string) {
    return this.courseServices.removeCourse(courseId);
  }

  // Update via ID
  @Put(':courseId')
  updateCourse(@Param('courseId') courseId: string, @Body() courseData: UpdateBookDTO) {
    return this.courseServices.updateCourse(courseId, courseData);
  }
  // Get all courses by on one user
  @Get('/user/:userId')
  getAllCourseOfUser(@Param('userId') userId: string) {
    return this.courseServices.getAllCourseOfUser(userId);
  }

  // Make a course banner
  @Put('/alert/:courseId')
  alertCourse(@Param('courseId') courseId: string) {
    return this.courseServices.alertCourse(courseId);
  }

  // Enroll Course for specific user
  @Post('/enroll/:userId')
  enrollCourse(@Param('userId') userId: string, @Body() courseOrderInfo: any) {
    return this.courseServices.enrollCourse(userId, courseOrderInfo);
  }
  // Get all course enroll by users
  @Get('/enroll/orders')
  getEnrollCourses() {
    return this.courseServices.getEnrollCourses();
  }
  // Get all course enroll by users
  @Get('/enroll/:courseId')
  getCourseEnrollUsers(@Param('courseId') courseId: string) {
    return this.courseServices.getCourseEnrollUsers(courseId);
  }
}
