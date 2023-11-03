import { CreateStaticPageDto, UpdateStaticPageDto } from 'src/dto/static.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import * as slug from 'slug';
@Injectable()
export class StaticPageService {
  constructor(private prisma: PrismaService) {}

  // Create a new page
  async createPage(data: CreateStaticPageDto) {
    const _slug = slug(data?.slug, '_');
    const page = this.prisma.staticPage.create({
      data: { ...data, slug: _slug },
    });
    return page;
  }

  // Delete the page
  deletePage(id: string) {
    const page = this.prisma.staticPage.delete({
      where: {
        id: id,
      },
    });
    return page;
  }

  // Update the page
  updatePage(id: string, data: UpdateStaticPageDto) {
    const page = this.prisma.staticPage.update({
      data: data,
      where: {
        id: id,
      },
    });
    return page;
  }

  // Update the page
  getAllPage() {
    const page = this.prisma.staticPage.findMany({});
    return page;
  }

  // Update the page
  async getPageBySlug(slug: string) {
    const page = await this.prisma.staticPage.findUnique({
      where: {
        slug: slug,
      },
    });
    return page;
  }
}
