import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostsService } from 'src/posts/posts.service';
import { UsersService } from 'src/users/users.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { Like, LikeDocument } from './entities/like.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectModel(Like.name) private likeModel: Model<LikeDocument>,
    private usersService: UsersService,
    private postsService: PostsService,
  ) {}

  async create(createLikeDto: CreateLikeDto) {
    try {
      if (
        (await this.usersService.findOne(createLikeDto.user)) &&
        (await this.postsService.findOne(createLikeDto.post))
      ) {
        const like = new this.likeModel(createLikeDto);
        return like.save();
      }
    } catch (e) {
      throw new HttpException(
        'Usuario ou Post não encontrado.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async likedPosts(userId: string) {
    const items = await this.likeModel.find({ user: userId });
    return await Promise.all(
      items.map(async (i) => await this.postsService.findOne(i.post)),
    );
  }

  async likesThePost(postId: string) {
    const post = await this.likeModel.find({ post: postId });
    return post.length;
  }
}
