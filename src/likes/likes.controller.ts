import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('likes')
@UseGuards(AuthGuard('jwt'))
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
