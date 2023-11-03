import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDTO } from 'src/dto/course.dto';
import { OK } from 'http-status';

@Injectable({})
export class CourseServices {
  constructor(private prisma: PrismaService) {}

  //Get all course data
  async getAllCourses(query) {
    const { courseCategory, limit = 10, page = 0 } = query;
    console.log(courseCategory, limit);
    const course = await this.prisma.course.findMany({
      // skip: Number(page) * Number(limit),
      // take: Number(limit),
      // where: {
      //   courseCategory,
      // },
    });

    return {
      message: 'Course Information',
      statusCode: OK,
      data: course,
    };
  }

  // Create a new course
  async createCourse(course: any) {
    return this.prisma.course.create({
      data: {
        instructor: course.instructor,
        title: course.title,
        shortDesc: course.shortDesc,
        courseCategory: course.courseCategory,
        description: course.description,
        images: course.images,
        price: course.price,
        category: course.category,
        instructorAbout: course.instructorAbout,
        startDate: course.startDate,
        endDate: course.endDate,
      },
    });
  }

  // Remove a  course by id
  async removeCourse(id: string) {
    const course = await this.prisma.course.delete({
      where: { id: id },
    });
    return course;
  }

  // Update Course by id
  async updateCourse(id: string, course: any) {
    console.log(course);
    const updateBook = await this.prisma.course.update({
      data: {
        instructor: course.instructor,
        title: course.title,
        courseBenefits: course?.courseBenefits,
        teaserVideo: course?.teaserVideo,
        sessionCount: course?.sessionCount,
        totalTimeforCompletion: course?.totalTimeforCompletion,
        shortDesc: course.shortDesc,
        courseCategory: course.courseCategory,
        description: course.description,
        zoomLink: course?.zoomLink,
        zoomPass: course?.zoomPass,
        images: course.images,
        price: course.price,
        category: course.category,
        instructorAbout: course.instructorAbout,
        startDate: course.startDate,
        endDate: course.endDate,
      },
      where: { id: id },
    });

    return updateBook;
  }

  async alertCourse(id: string) {
    const isAlreadyCourseAlert = await this.prisma.course.findMany({
      where: { isAlert: true },
    });
    if (!isAlreadyCourseAlert.length) {
      const updateBook = await this.prisma.course.update({
        data: {
          isAlert: true,
        },
        where: { id: id },
      });

      return {
        message: 'Update Course alert',
        statusCode: OK,
        data: updateBook,
      };
    } else {
      return {
        message: 'Already course have on alert.Please remove the alert first',
        statusCode: OK,
      };
    }
  }

  async getAllCourseOfUser(id: string) {
    const courses = await this.prisma.courseOrder.findMany({
      where: {
        userId: id,
      },
    });

    return {
      message: 'Enroll Courses for user ' + id,
      statusCode: OK,
      data: courses,
    };
  }
  // Get Course
  async getCourseViaId(id: string) {
    const course = await this.prisma.course.findUnique({
      where: {
        id: id,
      },
    });
    return course;
  }

  // Enroll Course
  async enrollCourse(userId: string, courseOrderInfo: any) {
    // const user = await this.prisma.user.findUnique({
    //   where: {
    //     id: userId,
    //   },
    // });

    const couponDetails = await this.prisma.coupon.findUnique({
      where: {
        code: courseOrderInfo.couponCode,
      },
    });
    function getTotalPrice(totalPrice: any, discount: any) {
      if (totalPrice - discount <= 0) {
        return 0;
      }
      return courseOrderInfo.totalPrice - couponDetails.discount;
    }
    const courseOrder = await this.prisma.courseOrder.create({
      data: {
        userId: userId,
        firstName: courseOrderInfo?.firstName,
        lastName: courseOrderInfo?.lastName,
        email: courseOrderInfo?.email,
        whatsappNumber: courseOrderInfo?.whatsappNumber,
        selectDate: courseOrderInfo?.selectDate,
        courseId: courseOrderInfo?.courseId,
        profession: courseOrderInfo?.profession,
        working: courseOrderInfo?.working,
        reasonToAttendCourse: courseOrderInfo?.reasonToAttendCourse,
        hearedAboutCourse: courseOrderInfo?.hearedAboutCourse,
        isReadRefundPolicy: courseOrderInfo?.isReadRefundPolicy,
        areYouAttendCourse: courseOrderInfo?.areYouAttendCourse,
        couponCode: courseOrderInfo?.couponCode,
        subtotalPrice: courseOrderInfo?.totalPrice,
        totalPrice: getTotalPrice(courseOrderInfo.totalPrice, couponDetails.discount),
      },
    });
    return { userId, courseOrder };
    // return await this.prisma.courseOrder.create({
    //   data: { userId: userId, ...courseOrderInfo },
    // });
  }

  // Get Enroll user list of specific course
  async getCourseEnrollUsers(courseId: string) {
    const data = await this.prisma.courseOrder.findMany({
      where: {
        courseId: courseId,
      },
    });
    return data;
  }

  //Get all course data
  async getEnrollCourses() {
    const courses = await this.prisma.courseOrder.findMany({
      include: {
        user: true,
        Course: true,
      },
    });
    return {
      message: 'Enroll Courses ',
      statusCode: OK,
      data: courses,
    };
  }
}
