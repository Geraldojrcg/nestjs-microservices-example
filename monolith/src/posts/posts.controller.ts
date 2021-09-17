import { Prisma } from '.prisma/client';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getFilteredPosts(
    @Query('take') take?: number,
    @Query('skip') skip?: number,
    @Query('searchString') searchString?: string,
    @Query('orderBy') orderBy?: 'asc' | 'desc',
  ) {
    return this.postsService.getFilteredPosts(
      take,
      skip,
      searchString,
      orderBy,
    );
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(id);
  }

  @Post()
  async createPost(@Body() data: Prisma.PostCreateInput) {
    return this.postsService.createPost(data);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(id);
  }

  @Put(':id/increment-views')
  async incrementPostViewCount(@Param('id') id: string) {
    return this.postsService.incrementPostViewCount(id);
  }
}
