import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
@UseGuards(AuthGuard('jwt'))
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Get('user/:id')
  findAllPostsByUser(@Param('id') id: string) {
    return this.postsService.findAllPostsByUser(id);
  }

  @Patch('likes/:id')
  likes(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.like(id, updatePostDto);
  }

  @Patch('comments/:id')
  comments(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.comment(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
