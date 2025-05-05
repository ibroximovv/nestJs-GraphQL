import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService){}
  async create(createProductInput: CreateProductInput) {
    try {
      const findDataByCategoryId = await this.prisma.category.findFirst({ where: { id: createProductInput.categoryId }})
      if (!findDataByCategoryId) throw new BadRequestException(`${createProductInput.categoryId} - Category not found`)
      return await this.prisma.product.create({ data: createProductInput });
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      console.log(error.message);
      throw new InternalServerErrorException(error.message || 'Internal server Error')
    }
  }

  async findAll() {
    try {
      return await this.prisma.product.findMany();
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      console.log(error.message);
      throw new InternalServerErrorException(error.message || 'Internal server Error')
    }
  }

  async findOne(id: number) {
    try {
      const findOne = await this.prisma.product.findFirst({ where: { id }})
      if (!findOne) throw new BadRequestException('Product not found')
      return findOne;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      console.log(error.message);
      throw new InternalServerErrorException(error.message || 'Internal server Error')
    }
  }

  async findByColor(color: string) {
    try {
      const findByColor = await this.prisma.product.findMany({ where: { color }})
      if (!findByColor) throw new BadRequestException('Product not found')
      return findByColor;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      console.log(error.message);
      throw new InternalServerErrorException(error.message || 'Internal server Error')
    }
  }

  async findByCategoryId(categoryId: number) {
    try {
      const findByCategoryId = await this.prisma.product.findMany({ where: { categoryId }})
      if (!findByCategoryId) throw new BadRequestException('Product not found')
      return findByCategoryId;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      console.log(error.message);
      throw new InternalServerErrorException(error.message || 'Internal server Error')
    }
  }

  async update(id: number, updateProductInput: UpdateProductInput) {
    try {
      const findOne = await this.prisma.product.findFirst({ where: { id }})
      if (!findOne) throw new BadRequestException('Product not found')
      return await this.prisma.product.update({ where: { id }, data: updateProductInput });
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      console.log(error.message);
      throw new InternalServerErrorException(error.message || 'Internal server Error')
    }
  }

  async remove(id: number) {
    try {
      const findOne = await this.prisma.product.findFirst({ where: { id }})
      if (!findOne) throw new BadRequestException('Product not found')
      return await this.prisma.product.delete({ where: { id }});
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      console.log(error.message);
      throw new InternalServerErrorException(error.message || 'Internal server Error')
    }
  }
}
