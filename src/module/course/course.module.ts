import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { CourseServices } from './course.service';
import { CourseController } from './course.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [CourseController],
  providers: [CourseServices, PrismaService],
})
export class CourseModule {}
