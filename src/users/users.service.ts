import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    try {
      return await this.userModel.findById(id);
    } catch (e) {
      throw new HttpException('Usuario não encontrado.', HttpStatus.NOT_FOUND);
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.userModel.findOne({ email: email });
    } catch (e) {
      throw new HttpException('Usuario não encontrado.', HttpStatus.NOT_FOUND);
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateUserDto,
      },
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.userModel
      .findByIdAndDelete({
        _id: id,
      })
      .exec();
  }
}
