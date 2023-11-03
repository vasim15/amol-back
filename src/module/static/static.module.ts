import { Module } from '@nestjs/common';
import { StaticPageController } from './static.controller';
import { StaticPageService } from './static.service';
import { PrismaService } from '../prisma/prisma.service';
@Module({
  providers: [StaticPageService, PrismaService],
  controllers: [StaticPageController],
})
export class StaticPageModule {}
