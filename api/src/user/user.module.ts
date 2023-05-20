import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ProductSchema } from 'src/product/schemas/product.scehma';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
