import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { QuestionBankService } from './question.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Question Bank')
@Controller('question')
export class QuestionBankController {
  constructor(private questionBankService: QuestionBankService) {}

  // Get all questions Group
  @Get('/group/:questionGrpId/all')
  async getAllQuestionsOfGroup(@Param('questionGrpId') id: string) {
    return await this.questionBankService.getAllQuestionsOfGroup(id);
  }

  @Get('/group/all')
  async getAllQuestionGroup() {
    return await this.questionBankService.getAllQuestionGroup();
  }

  // Create a new QuestionBank Group
  @Post('group/create')
  async createQuestionGroup(@Body() question: any) {
    return await this.questionBankService.createQuestionGroup(question);
  }

  // Create a new question
  @Post('create')
  async createQuestion(@Body() question: any) {
    return await this.questionBankService.createQuestion(question);
  }
}
