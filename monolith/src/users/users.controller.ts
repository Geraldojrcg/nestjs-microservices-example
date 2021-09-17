import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '.prisma/client';
import { kafkaConfig, KAFKA_TOPICS } from 'src/config/kafka.config';
import { Client, ClientKafka } from '@nestjs/microservices';
import { Producer } from '@nestjs/microservices/external/kafka.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Client(kafkaConfig)
  client: ClientKafka;
  producer: Producer;

  async onModuleInit() {
    this.producer = await this.client.connect();
  }

  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id/posts')
  async getUserPosts(@Param('id') id: string) {
    return this.usersService.getUserPosts(+id);
  }

  @Post('signup')
  async signupUser(@Body() data: Prisma.UserCreateInput) {
    const user = await this.usersService.create(data);
    if (user) {
      this.producer?.send({
        topic: KAFKA_TOPICS.USER_CREATED,
        messages: [{ value: JSON.stringify(user) }],
      });
    }
    return user;
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: Prisma.UserUpdateInput,
  ) {
    const user = await this.usersService.update(+id, data);
    if (user) {
      this.producer?.send({
        topic: KAFKA_TOPICS.USER_UPDATED,
        messages: [{ value: JSON.stringify(user) }],
      });
    }
    return user;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.usersService.delete(+id);
    if (user) {
      this.producer?.send({
        topic: KAFKA_TOPICS.USER_DELETED,
        messages: [{ value: JSON.stringify({ id: user.id }) }],
      });
    }
    return user;
  }
}
