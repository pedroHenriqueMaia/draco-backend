import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_CONNSTRING),
    UsersModule,
    PostsModule,
    AuthModule,
    LikesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
