import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  async getOneUser(@Param('id') id: string) {
    return this.userService.getOneUser(id);
  }

  @Post('/register')
  async createUser(@Body() user) {
    return this.userService.createUser(user);
  }
  @Post('/login')
  async loginUser(@Body() user) {
    return this.userService.loginUser(user.username, user.password);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Put('/update/:id')
  async updateUser(@Param('id') id: string, @Body() user) {
    return this.userService.updateUser(id, user);
  }

  @Put('/wishlist/add/:userId/:productId')
  async addToWishlist(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ) {
    return this.userService.addToWishlist(userId, productId);
  }

  @Put('/wishlist/remove/:userId/:productId')
  async removeFromWishlist(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ) {
    return this.userService.removeFromWishlist(userId, productId);
  }
}
