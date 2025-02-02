import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserWithOutPassword } from './schema/user.schema';
import { Model } from 'mongoose';
import { EncryptUtil } from 'src/utils/encryp.util';
import { LoginUserDto } from './dto/login_user_dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async create(user: CreateUserDto) {
    //extraer password
    const { passsword } = user;
    const password: string = await EncryptUtil.hashPassword(passsword);
    user.passsword = password;
    //encriptar password
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }
  async login(login: LoginUserDto): Promise<{ access_token: string }> {
    try {
      const { name, passsword } = login;
      const user = await this.userModel.findOne({ name });
      if (user) {
        const isMatch = await EncryptUtil.comparePassword(
          passsword,
          user.passsword,
        );
        if (isMatch) {
          const payload = { name: user.name, id: user._id };
          const access_token = this.jwtService.sign(payload);
          return { access_token };
        }
      }
      throw new NotFoundException('User not found');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      //returna un 404
      throw new NotFoundException('User not found');
    }
  }
  //find
  async findUser(name: string): Promise<UserWithOutPassword> {
    const user = await this.userModel.findOne({ name }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return UserWithOutPassword.fromUser(user);
  }
  //findall
  async findAll(): Promise<UserWithOutPassword[]> {
    try {
      const users = await this.userModel.find().exec();
      return users.map((user) => UserWithOutPassword.fromUser(user));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException('No users found');
    }
  }
  //update
  async update(name: string, id: CreateUserDto): Promise<UserWithOutPassword> {
    try {
      const user = await this.userModel
        .findOneAndUpdate({ _id: id }, { $set: { name: name } }, { new: true })
        .exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return UserWithOutPassword.fromUser(user);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
  //delete
  async delete(name: string): Promise<UserWithOutPassword> {
    try {
      const user = await this.userModel.findOneAndDelete({ name }).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return UserWithOutPassword.fromUser(user);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
