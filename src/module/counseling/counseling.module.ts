import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { CounselingServices } from './counseling.service';
import { CounselingController } from './counseling.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [CounselingController],
  providers: [CounselingServices, PrismaService],
})
export class CounselingModule {}
