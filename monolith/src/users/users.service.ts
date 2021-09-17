import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { User as UserModel, Post as PostModel, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUsers(): Promise<UserModel[]> {
    return this.prismaService.user.findMany();
  }

  async getUserPosts(id: number): Promise<PostModel[]> {
    return this.prismaService.user
      .findUnique({
        where: { id },
      })
      .posts({
        where: {
          published: true,
        },
      });
  }

  async create(data: Prisma.UserCreateInput): Promise<UserModel> {
    return this.prismaService.user.create({
      data: data,
    });
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<UserModel> {
    return this.prismaService.user.update({
      where: { id },
      data: data,
    });
  }

  async delete(id: number): Promise<UserModel> {
    return this.prismaService.user.delete({
      where: { id },
    });
  }
}
