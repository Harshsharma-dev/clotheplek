import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Not } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ProductImage } from '../entities/product-image.entity';
import { ProductVariant } from '../entities/product-variant.entity';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,
    @InjectRepository(ProductVariant)
    private productVariantRepository: Repository<ProductVariant>,
  ) {}

  async findAll(options?: {
    category_id?: string;
    is_featured?: boolean;
    is_new?: boolean;
    gender?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ products: Product[]; total: number }> {
    const query = this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.variants', 'variants')
      .where('product.is_active = :is_active', { is_active: true })
      .orderBy('product.sort_order', 'ASC')
      .addOrderBy('product.created_at', 'DESC');

    if (options?.category_id) {
      query.andWhere('product.category_id = :category_id', { category_id: options.category_id });
    }

    if (options?.is_featured !== undefined) {
      query.andWhere('product.is_featured = :is_featured', { is_featured: options.is_featured });
    }

    if (options?.is_new !== undefined) {
      query.andWhere('product.is_new = :is_new', { is_new: options.is_new });
    }

    if (options?.gender) {
      query.andWhere('product.gender = :gender', { gender: options.gender });
    }

    if (options?.search) {
      query.andWhere(
        '(product.name ILIKE :search OR product.description ILIKE :search OR product.tags::text ILIKE :search)',
        { search: `%${options.search}%` }
      );
    }

    const total = await query.getCount();

    if (options?.limit) {
      query.limit(options.limit);
    }

    if (options?.offset) {
      query.offset(options.offset);
    }

    const products = await query.getMany();

    return { products, total };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category', 'images', 'variants'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async findBySlug(slug: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { slug },
      relations: ['category', 'images', 'variants'],
    });

    if (!product) {
      throw new NotFoundException(`Product with slug ${slug} not found`);
    }

    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    return await this.productRepository.find({
      where: { is_featured: true, is_active: true },
      relations: ['category', 'images'],
      order: { sort_order: 'ASC', created_at: 'DESC' },
      take: limit,
    });
  }

  async getNewProducts(limit: number = 8): Promise<Product[]> {
    return await this.productRepository.find({
      where: { is_new: true, is_active: true },
      relations: ['category', 'images'],
      order: { created_at: 'DESC' },
      take: limit,
    });
  }

  async getRelatedProducts(productId: string, categoryId: string, limit: number = 4): Promise<Product[]> {
    return await this.productRepository.find({
      where: {
        category_id: categoryId,
        is_active: true,
        id: Not(productId),
      },
      relations: ['images'],
      order: { created_at: 'DESC' },
      take: limit,
    });
  }
} 