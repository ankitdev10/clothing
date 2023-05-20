import {
  Injectable,
  NotAcceptableException,
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
  async createUser(user: User) {
    try {
      const checkUser: User = await this.userModel.findOne({
        username: user.username,
      });
      if (checkUser) throw new UnauthorizedException('Username already exists');
      const salt = await bcrypt.genSalt(10);
      const hashPw = await bcrypt.hash(user.password, salt);
      const saveUser = await this.userModel.create({
        ...user,
        password: hashPw,
      });
      return saveUser;
    } catch (error) {
      throw new UnauthorizedException({
        error: error.name,
        message: error.message,
      });
    }
  }

  async loginUser(username: string, password: string) {
    try {
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
    } catch (error) {
      throw new UnauthorizedException({
        error: error.error,
        message: error.message,
      });
    }
  }

  async updateUser(id: string, user: User) {
    console.log(user);
    const findUser = await this.userModel.findById(id);
    //  check if logged in user is same as id to be updated
    if (user.password) {
      // user wants to change password so hash it again
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      {
        $set: { ...user },
      },
      { new: true },
    );

    return updatedUser;
  }

  async deleteUser(id: string) {
    const findUser = await this.userModel.findByIdAndDelete(id);
    if (!findUser) throw new NotFoundException();
    return 'Sucessfully deleted account of the user';
  }

  async addToWishlist(userId: string, productId: string) {
    const findUser = await this.userModel.findById(userId);
    if (findUser.wishlist.includes(productId)) {
      throw new NotAcceptableException(
        'Product already exists on your wishlish',
      );
    }

    await this.userModel.findByIdAndUpdate(
      userId,
      {
        $push: { wishlist: productId },
      },
      { returnDocument: 'after' },
    );
    const { password, ...details } = findUser;

    return details;
  }

  async removeFromWishlist(userId: string, productId: string) {
    const findUser = await this.userModel.findById(userId);
    if (!findUser.wishlist.includes(productId)) {
      throw new NotAcceptableException(
        'Product does not exist on your wishlish',
      );
    }
    await findUser.updateOne(
      {
        $pull: { wishlist: productId },
      },
      { returnDocument: 'after' },
    );
    const { password, ...details } = findUser;
    return details;
  }
}
