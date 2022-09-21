import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_CONNSTRING),
    UsersModule,
    PostsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
