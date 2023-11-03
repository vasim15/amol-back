import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// import { CreateCounselingDTO } from 'src/dto/course.dto';
import { NOT_ACCEPTABLE, OK } from 'http-status';

@Injectable({})
export class CounselingServices {
  constructor(private prisma: PrismaService) {}

  //Get all courseCategory data
  async getAllCounselings(query) {
    const { courseCategory, limit = 10, page = 0 } = query;
    console.log(courseCategory, limit);
    const course = await this.prisma.counseling.findMany({
      // skip: Number(page) * Number(limit),
      // take: Number(limit),
    });

    return {
      message: 'Counseling Information',
      statusCode: OK,
      data: course,
    };
  }

  // Create a new counseling
  async createCounseling(course: any) {
    return await this.prisma.counseling.create({
      data: {
        title: course.title,
        slots: course.slots,
        instructor: course.instructor,
        instructorAbout: course.instructorAbout,
        counselingBenefits: course.counselingBenefits,
        description: course.description,
        counselingCategory: course.counselingCategory,
        images: course.images,
        price: course.price,
      },
    });
  }

  // Remove a  course by id
  async removeCounseling(id: string) {
    const course = await this.prisma.course.delete({
      where: { id: id },
    });
    return course;
  }

  // Update Counseling by id
  async updateCounseling(id: string, course: any) {
    console.log(course);
    const updateBook = await this.prisma.counseling.update({
      data: {
        title: course.title,
        slots: course.slots,
        instructor: course.instructor,
        instructorAbout: course.instructorAbout,
        counselingBenefits: course.counselingBenefits,
        description: course.description,
        images: course.images, // Assuming course.images is an array
        counselingCategory: course.counselingCategory,
        price: course.price,
      },
      where: { id: id },
    });

    return updateBook;
  }

  // Get Counseling of specif User
  async getCounselingOfUser(id: string) {
    const counselings = await this.prisma.counselingOrder.findMany({
      where: {
        userId: id,
      },
    });
    return counselings;
  }

  // Enroll Counseling
  async enrollCounseling(userId: string, userInfo: any) {
    const course = await this.prisma.counseling.findUnique({
      where: {
        id: userInfo.counselingId,
      },
    });

    if (course && course.slots > 0) {
      // Decrease slots by 1 and increase slotsBooked by 1
      const updatedCourse = await this.prisma.counseling.update({
        where: {
          id: userInfo.counselingId,
        },
        data: {
          slots: {
            decrement: 1,
          },
          slotsBooked: {
            increment: 1,
          },
        },
      });

      // Create a counseling order for the user
      return await this.prisma.counselingOrder.create({
        data: { userId, ...userInfo },
      });
    } else {
      return {
        message: 'All slots are booked.',
        statusCode: NOT_ACCEPTABLE,
        status: false,
      };
    }
  }

  // Get Enroll user list of specific course
  async getCounselingEnrollUsers() {
    const data = await this.prisma.counseling.findMany({
      // where: {
      //   courseId: courseId,
      // },
      // include: {
      //   users: true,
      // },
    });
    return data;
  }

  async getCounselingById(id: string) {
    const data = await this.prisma.counseling.findUnique({
      where: {
        id: id,
      },
    });
    return data;
  }

  async getAllCounselingBooking() {
    const data = await this.prisma.counselingOrder.findMany({});
    return data;
  }
}
