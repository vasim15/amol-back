import { ApiTags } from '@nestjs/swagger';
import { ContestServices } from './contest.service';
import { Body, Controller, Get, Delete, Post, Put, Param } from '@nestjs/common';
import { RegisterContestDTO } from 'src/dto/contest.dto';
@Controller('contest')
@ApiTags('Contest')
export class ContestController {
  constructor(private contestService: ContestServices) {}

  // Get all contest
  @Get('all')
  getAllContest() {
    return this.contestService.getAllContest();
  }

  // get specific contest
  @Get(':id')
  getSpecificContest(@Param('id') contestId: string) {
    return 'dfhjfsd';
  }

  // create new contest
  @Post('create')
  createContest(@Body() contest: any) {
    return this.contestService.createContest(contest);
  }

  // Delete  Book Id
  @Delete(':contestId')
  removeBook(@Param('contestId') contestId: string) {
    return this.contestService.removeContest(contestId);
  }
  // Enroll Course for specific user
  @Post('/register/:userId')
  enrollCourse(@Param('userId') userId: string, @Body() contestInfo: RegisterContestDTO) {
    return this.contestService.registerContest(userId, contestInfo);
  }

  // Update via ID
  //   @Put(':id')
  //   updateBook(@Param('id') id: string, @Body() contestData: any) {
  //     return this.contestService.updateContest(id, contestData);
  //   }
}
