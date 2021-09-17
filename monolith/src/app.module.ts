import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [UsersModule, PostsModule],
  providers: [PrismaService],
})
export class AppModule {}
