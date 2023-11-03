import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { retry } from 'rxjs';

@Injectable()
export class ContestServices {
  constructor(private prisma: PrismaService) {}

  //create new contest
  async createContest(data: any) {
    const contestData = await this.prisma.contest.create({
      data: data,
    });
    return contestData;
  }
  // get All contest
  async getAllContest() {
    return await this.prisma.contest.findMany();
  }

  async removeContest(id: string) {
    return await this.prisma.contest.delete({
      where: { id: id },
    });
  }

  async updateContest() {
    return 'dfghsd';
  }

  // Enroll Course
  async registerContest(userId: string, contestInfo: any) {
    return await this.prisma.contestRegister.create({
      data: { userId, ...contestInfo },
    });
  }
}
