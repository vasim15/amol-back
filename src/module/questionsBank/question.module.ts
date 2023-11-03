import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QuestionBankService } from './question.service';
import { QuestionBankController } from './question.controllers';

@Module({
  providers: [PrismaService, QuestionBankService],
  controllers: [QuestionBankController],
})
export class QuestionBankModule {}
