import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContestController } from './contest.controller';
import { ContestServices } from './contest.service';

@Module({
  providers: [ContestServices, PrismaService],
  controllers: [ContestController],
})
export class ContestModule {}
