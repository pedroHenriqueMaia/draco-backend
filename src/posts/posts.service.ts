import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private usersService: UsersService,
  ) {}

  async create(createPostDto: CreatePostDto) {
    try {
      if (await this.usersService.findOne(createPostDto.userAuthor)) {
        const Post = new this.postModel(createPostDto);
        return Post.save();
      }
    } catch (e) {
      throw new HttpException('Usuario não encontrado.', HttpStatus.NOT_FOUND);
    }
  }

  findAll() {
    return this.postModel.find();
  }

  findOne(id: string) {
    return this.postModel.findById(id);
  }

  findAllPostsByUser(id: string) {
    return this.postModel.find({ userAuthor: id });
  }

  async comment(id: string, updatePostDto: UpdatePostDto) {
    const posts = await this.findOne(id);
    return await Promise.all(
      updatePostDto.comments.allComments.map(async (i) => {
        if (await this.usersService.findOne(i.user)) {
          posts.comments.allComments.push(i);
          posts.comments.totalComments = posts.comments.allComments.length;
          return this.postModel.findByIdAndUpdate(
            {
              _id: id,
            },
            {
              $set: posts,
            },
            {
              new: true,
            },
          );
        }
      }),
    );
  }
  async like(id: string, updatePostDto: UpdatePostDto) {
    let post = await this.findOne(id);
    return await Promise.all(
      updatePostDto.likes.users.map(async (i) => {
        if (await this.usersService.findOne(i)) {
          post = this.likeAndUnliked(post, i);
          return this.postModel.findByIdAndUpdate(
            {
              _id: id,
            },
            {
              $set: post,
            },
            {
              new: true,
            },
          );
        }
      }),
    );
  }

  likeAndUnliked(post: any, user: string) {
    let deslike = false;
    console.log(post);
    post.likes.users.map((a) => {
      if (a == user) {
        post.likes.users = post.likes.users.filter((a) => a != user);
        post.likes.totalLikes = post.likes.users.length;
        deslike = true;
      }
    });

    if (!deslike) {
      post.likes.users.push(user);
      post.likes.totalLikes = post.likes.users.length;
    }

    return post;
  }

  remove(id: string) {
    return this.postModel
      .findByIdAndDelete({
        _id: id,
      })
      .exec();
  }
}
