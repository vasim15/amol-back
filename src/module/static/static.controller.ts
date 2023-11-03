import { ApiTags } from '@nestjs/swagger';
import { StaticPageService } from './static.service';
import { Body, Delete, Controller, Put, Param, Post, Get } from '@nestjs/common';
import { CreateStaticPageDto, UpdateStaticPageDto } from 'src/dto/static.dto';

@Controller('static-page')
@ApiTags('Static Page')
export class StaticPageController {
  constructor(private staticPageService: StaticPageService) {}

  // Create a new Page
  @Post('create')
  createPage(@Body() page: CreateStaticPageDto) {
    return this.staticPageService.createPage(page);
  }

  // Delete a  Page
  @Delete(':pageId')
  deletePage(@Param('pageId') id: any) {
    return this.staticPageService.deletePage(id);
  }

  // update new page
  @Put(':pageId')
  updatePage(@Param('pageId') pageId: any, @Body() page: UpdateStaticPageDto) {
    return this.staticPageService.updatePage(pageId, page);
  }

  // get slug page
  @Get(':slug')
  getPageBySlug(@Param('slug') slug: string) {
    return this.staticPageService.getPageBySlug(slug);
  }

  // Get all pages
  @Get('all')
  getAllPages() {
    return this.staticPageService.getAllPage();
  }
}
