import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async getAllUsers(): Promise<User[] | {}> {
    const users = await this.userModel.find();
    if (!users) return { error: 'User not found' };
    return users;
  }

  async getOneUser(id: string) {
    const user: any = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    const { password, ...details } = user._doc;

    return details;
  }
  async createUser(username: string, email: string, password: string) {
    try {
      const checkUser = await this.userModel.findOne({ username: username });
      if (checkUser) return { error: 'Username already exists' };
      const salt = await bcrypt.genSalt(10);
      const hashPw = await bcrypt.hash(password, salt);
      const saveUser = await this.userModel.create({
        username,
        email,
        password: hashPw,
      });
      delete saveUser.password;
      return saveUser;
    } catch (error) {
      return { error: error.name, message: error.message };
    }
  }

  async loginUser(username: string, password: string) {
    const user = await this.userModel.findOne({ username });
    if (!user)
      throw new NotFoundException(
        'User not found. Check your username and try again',
      );
    const checkPw = await bcrypt.compare(password, user.password);
    if (!checkPw) {
      throw new UnauthorizedException('Incorrect password');
    }
    return user;
  }

  async updateUser(id: string, user) {
    const findUser = await this.userModel.findById(id);
    if (user.password) {
      // user wants to change password so hash it again
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
    }
    await this.userModel.findByIdAndUpdate(
      id,
      {
        $set: { ...user },
      },
      { new: true },
    );
    return 'Sucessfully updated account';
  }

  async deleteUser(id: string) {
    const findUser = await this.userModel.findByIdAndDelete(id);
    if (!findUser) throw new NotFoundException();
    return 'Sucessfully deleted account of the user';
  }
}
