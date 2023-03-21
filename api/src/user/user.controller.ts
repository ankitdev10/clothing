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
    return this.userService.createUser(
      user.username,
      user.email,
      user.password,
    );
  }
  @Post('/login')
  async loginUser(@Body() user) {
    return this.userService.loginUser(user.username, user.password);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() user) {
    return this.userService.updateUser(id, user);
  }
}
