import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InstituteController } from './institute.controller';
import { InstituteService } from './institute.service';

@Module({
  controllers: [InstituteController],
  providers: [InstituteService, PrismaService],
})
export class InstituteModule {}
