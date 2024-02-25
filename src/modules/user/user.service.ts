import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoServerError } from 'mongodb';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user')
    private userModel: Model<User>,
  ) {}

  // todo: validator role enum
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const createdUser = await this.userModel.create({
        ...createUserDto,
        password: hashedPassword,
      });
      return createdUser;
    } catch (error) {
      console.error(error);
      if (error instanceof MongoServerError && error.code === 11000) {
        throw new ConflictException(
          'A document with the same username id already exists.',
        );
      }
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().sort({ username: 1 }).exec();
  }

  async findOne(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) throw new NotFoundException();

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    const updatedUser = await this.userModel
      .findOneAndUpdate({ _id: id }, updateUserDto, { new: true })
      .exec();

    if (!updatedUser) throw new NotFoundException();
  }

  async remove(username: string): Promise<void> {
    const deletedUser = await this.userModel
      .findOneAndDelete({ username })
      .exec();

    if (!deletedUser) throw new NotFoundException();
  }
}
