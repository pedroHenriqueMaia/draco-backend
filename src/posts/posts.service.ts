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
  private usersService: UsersService
  ) {}

async create(createPostDto: CreatePostDto) {
  try{
    if(await this.usersService.findOne(createPostDto.userAuthor)){
      const Post = new this.postModel(createPostDto);
      return Post.save();
    }
  }catch(e) {
    throw new HttpException('Usuario não encontrado.', HttpStatus.NOT_FOUND)
  }
}

findAll() {
  return this.postModel.find();
}

findOne(id: string) {
  return this.postModel.findById(id);
}


findAllPostsByUser(id: string) {
  return this.postModel.find({userAuthor: id});
}

update(id: string, updatePostDto: UpdatePostDto) {
  return this.postModel.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      $set: updatePostDto,
    },
    {
      new: true,
    },
  );
}

remove(id: string) {
  return this.postModel
    .findByIdAndDelete({
      _id: id,
    })
    .exec();
}
}
