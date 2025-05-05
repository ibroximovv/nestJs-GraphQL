import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService){}
  async create(createCategoryInput: CreateCategoryInput) {
    try {
      return await this.prisma.category.create({ data: createCategoryInput });
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      console.log(error.message);
      throw new InternalServerErrorException(error.message || 'Internal Server error')
    }
  }

  async findAll() {
    try {
      return await this.prisma.category.findMany();
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      console.log(error.message);
      throw new InternalServerErrorException(error.message || 'Internal Server error')
    }
  }

  async findOne(id: number) {
    try {
      const findOne = await this.prisma.category.findFirst({ where: { id }})
      if (!findOne) throw new BadRequestException('Category not found')
      return findOne;
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      console.log(error.message);
      throw new InternalServerErrorException(error.message || 'Internal Server error')
    }
  }

  async update(id: number, updateCategoryInput: UpdateCategoryInput) {
    try {
      const findOne = await this.prisma.category.findFirst({ where: { id }})
      if (!findOne) throw new BadRequestException('Category not found')
      return await this.prisma.category.update({ where: { id }, data: updateCategoryInput });
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      console.log(error.message);
      throw new InternalServerErrorException(error.message || 'Internal Server error')
    }
  }

  async remove(id: number) {
    try {
      const findOne = await this.prisma.category.findFirst({ where: { id }})
      if (!findOne) throw new BadRequestException('Category not found')
      return await this.prisma.category.delete({ where: { id }});
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      console.log(error.message);
      throw new InternalServerErrorException(error.message || 'Internal Server error')
    }
  }
}
