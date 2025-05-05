import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [ProductModule, PrismaModule, GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    debug: true,
    playground: true,
    autoSchemaFile: true
  }), CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
