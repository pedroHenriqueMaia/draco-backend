import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likesService.create(createLikeDto);
  }

  @Get('user/:id')
  likedPosts(@Param('id') id: string) {
    return this.likesService.likedPosts(id);
  }

  @Get('post/:id')
  likesThePost(@Param('id') id: string) {
    return this.likesService.likesThePost(id);
  }
}
