import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string

  @Field()
  color: string

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  categoryId: number
}