import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import axios from 'axios';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/add')
  addProduct(@Body() product) {
    return this.productService.addProduct(product);
  }

  @Get('/all')
  async getProduct() {
    return await this.productService.getAllProd();
  }

  @Get('/category')
  async getByCat(@Query() { cat }) {
    return await this.productService.getByCat(cat);
  }

  @Get('/single/:id')
  async getOneProd(@Param('id') id: string) {
    return await this.productService.getOneProd(id);
  }

  @Put('/update/:id')
  async updateProduct(@Body() product, @Param('id') id) {
    return this.productService.updateProduct(product, id);
  }

  @Put('/buy/:id')
  async buyProd(@Param('id') id, @Body() { num }) {
    return this.productService.buyProduct(id, num);
  }

  @Put('/stock/:id')
  async addToStock(@Body() { num }, @Param('id') id) {
    return this.productService.addProductInStock(id, num);
  }

  @Delete('/delete/:id')
  async deleteProduct(@Param('id') id) {
    return this.productService.deleteProd(id);
  }
  @Post('/himalaya')
  async getReq() {
    return this.productService.getReq();
  }
}
