import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Product } from './schemas/product.scehma';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: mongoose.Model<Product>,
  ) {}

  async addProduct(
    product: Object,
  ): Promise<Product | { error: string; message: string }> {
    try {
      const saveProd = await this.productModel.create({ ...product });
      return saveProd;
    } catch (error) {
      return { error: error.error, message: error.message };
    }
  }

  async getAllProd(): Promise<Product[] | { error: string; message: string }> {
    try {
      const prods = await this.productModel.find();
      return prods;
    } catch (error) {
      return { error: error.error, message: error.message };
    }
  }

  async getOneProd(
    id: string,
  ): Promise<Product | { error: string; message: string }> {
    try {
      const prod = await this.productModel.findById(id);
      return prod;
    } catch (error) {
      return { error: error.error, message: error.message };
    }
  }

  async updateProduct(
    prod: Product,
    id: string,
  ): Promise<Product | { error: string; message: string }> {
    try {
      const product = await this.productModel.findByIdAndUpdate(
        id,
        {
          $set: { ...prod },
        },
        { $new: true },
      );

      return product;
    } catch (error) {
      return { error: error.error, message: error.message };
    }
  }

  async getByCat(
    cat: string,
  ): Promise<Product[] | string | { error: string; message: string }> {
    try {
      const prods = await this.productModel.find({ cat });
      return prods;
    } catch (error) {
      return { error: error.error, message: error.message };
    }
  }

  async buyProduct(id: string, num: any): Promise<string | {}> {
    try {
      const findProd = await this.productModel.findById(id);
      if (!(findProd.qty > 0)) {
        throw new ServiceUnavailableException('Out of stock');
      }
      await findProd.updateOne({
        $inc: { qty: -num },
      });
      return 'Sucessfully bought the product';
    } catch (err) {
      return { error: err.error, message: err.message };
    }
  }

  async addProductInStock(
    id: string,
    num: number,
  ): Promise<Product | { error: string; message: string }> {
    try {
      // check if product exists
      const findProd = await this.productModel.findById(id);
      if (!findProd)
        throw new ServiceUnavailableException(
          'Can not add stock to an non-existing product',
        );
      await findProd.updateOne(
        {
          $inc: { qty: num },
        },
        {
          $new: true,
        },
      );
      return findProd;
    } catch (err) {
      return { error: err.error, message: err.message };
    }
  }

  async deleteProd(
    id: string,
  ): Promise<string | { error: string; message: string }> {
    try {
      const findProd = await this.productModel.findByIdAndDelete(id);
      if (!findProd) throw new NotFoundException('Product not found');
      return 'Sucessfully deleted the product';
    } catch (error) {
      return { error: error.error, message: error.message };
    }
  }
}
