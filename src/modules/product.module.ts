import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { ProductImage } from '../entities/product-image.entity';
import { ProductVariant } from '../entities/product-variant.entity';
import { ProductController } from '../controllers/product.controller';
import { ProductService } from '../services/product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductImage, ProductVariant]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {} 