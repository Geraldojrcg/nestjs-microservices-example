import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Post as PostModel, Prisma } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPostById(id: string): Promise<PostModel> {
    return this.prismaService.post.findUnique({ where: { id: Number(id) } });
  }

  async getFilteredPosts(
    take?: number,
    skip?: number,
    searchString?: string,
    orderBy?: 'asc' | 'desc',
  ): Promise<PostModel[]> {
    const or = searchString
      ? {
          OR: [
            { title: { contains: searchString } },
            { content: { contains: searchString } },
          ],
        }
      : {};

    return this.prismaService.post.findMany({
      where: {
        published: true,
        ...or,
      },
      include: { author: true },
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      orderBy: {
        updatedAt: orderBy,
      },
    });
  }

  async createPost(data: Prisma.PostCreateInput): Promise<PostModel> {
    return this.prismaService.post.create({ data });
  }

  async deletePost(id: string): Promise<PostModel> {
    return this.prismaService.post.delete({ where: { id: Number(id) } });
  }

  async incrementPostViewCount(id: string): Promise<PostModel> {
    return this.prismaService.post.update({
      where: { id: Number(id) },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });
  }
}
