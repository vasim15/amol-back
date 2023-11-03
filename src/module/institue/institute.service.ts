import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInstitute } from 'src/dto/institute.dto';

@Injectable()
export class InstituteService {
  constructor(private prisma: PrismaService) {}

  //Create New Institute by admin
  createInstitute(institute: CreateInstitute) {
    return this.prisma.institute.create({
      data: institute,
    });
  }
  //Get All Institute
  getAllInstitute() {
    return this.prisma.institute.findMany();
  }

  //Delete Institute by admin
  deleteInstitute(id: string) {
    return this.prisma.institute.delete({
      where: {
        id: id,
      },
    });
  }
}
