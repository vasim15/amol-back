import { CreateInstitute } from 'src/dto/institute.dto';
import { InstituteService } from './institute.service';
import { Body, Controller, Post, Get, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Institute')
@Controller('institute')
export class InstituteController {
  constructor(private instituteService: InstituteService) {}

  /// Create a new Institute
  @Post('create')
  createInstitute(@Body() institute: CreateInstitute) {
    return this.instituteService.createInstitute(institute);
  }

  // Delete  a Institute Id
  @Delete(':instituteId')
  deleteInstitute(@Param('instituteId') instituteId: string) {
    return this.instituteService.deleteInstitute(instituteId);
  }

  // Get all IInstitute
  @Get('/all')
  getAllInstitute() {
    return this.instituteService.getAllInstitute();
  }
}
