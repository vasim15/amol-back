import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OK } from 'http-status';

@Injectable()
export class QuestionBankService {
  constructor(private prisma: PrismaService) {}

  // Create  a new QuestionBank

  async createQuestionGroup(data: any) {
    const question = await this.prisma.questionBankGroup.create({
      data: {
        name: data.name,
        noOfQuestions: data.noOfQuestions,
      },
    });

    return {
      message: 'Question Group created',
      statusCode: OK,
      status: true,
      data: question,
    };
  }

  // Create  a new Question
  async createQuestion(data: any) {
    const question = await this.prisma.question.create({
      data,
    });

    return {
      message: 'Question  created',
      statusCode: OK,
      status: true,
      data: question,
    };
  }
  async getAllQuestionGroup() {
    const questions = await this.prisma.questionBankGroup.findMany({});
    return {
      message: 'Questions fetched',
      statusCode: OK,
      status: true,
      data: questions,
    };
  }

  async getAllQuestionsOfGroup(grpId: string) {
    const questions = await this.prisma.question.findMany({
      where: {
        questionBankGroupId: grpId,
      },
    });
    return {
      message: 'Questions fetched of group',
      statusCode: OK,
      status: true,
      data: questions,
    };
  }
}
