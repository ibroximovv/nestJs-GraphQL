import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  createProduct(@Args('createProductInput') createProductInput: CreateProductInput) {
    return this.productService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'allPrd' })
  findAll() {
    return this.productService.findAll();
  }

  @Query(() => Product, { name: 'onePrd' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productService.findOne(id);
  }

  @Query(() => [Product], { name: 'findByColor' })
  findByColor(@Args('color') color: string) {
    return this.productService.findByColor(color)
  }

  @Query(() => [Product], { name: 'findByCategoryId' })
  findByCategoryId(@Args('categoryId', { type: () => Int }) categoryId: number) {
    return this.productService.findByCategoryId(categoryId)
  }

  @Mutation(() => Product)
  updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductInput) {
    return this.productService.update(updateProductInput.id, updateProductInput);
  }

  @Mutation(() => Product)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productService.remove(id);
  }
}
