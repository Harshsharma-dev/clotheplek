import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ProductService } from '../services/product.service';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { Product } from '../entities/product.entity';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products with filtering options' })
  @ApiQuery({ name: 'category_id', required: false, description: 'Filter by category ID' })
  @ApiQuery({ name: 'is_featured', required: false, description: 'Filter by featured products' })
  @ApiQuery({ name: 'is_new', required: false, description: 'Filter by new products' })
  @ApiQuery({ name: 'gender', required: false, description: 'Filter by gender (men/women/unisex)' })
  @ApiQuery({ name: 'search', required: false, description: 'Search in name, description, tags' })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of products to return' })
  @ApiQuery({ name: 'offset', required: false, description: 'Number of products to skip' })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
  async findAll(
    @Query('category_id') category_id?: string,
    @Query('is_featured') is_featured?: string,
    @Query('is_new') is_new?: string,
    @Query('gender') gender?: string,
    @Query('search') search?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.productService.findAll({
      category_id,
      is_featured: is_featured ? is_featured === 'true' : undefined,
      is_new: is_new ? is_new === 'true' : undefined,
      gender,
      search,
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined,
    });
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured products' })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of products to return', example: 8 })
  @ApiResponse({ status: 200, description: 'Featured products retrieved successfully' })
  async getFeaturedProducts(@Query('limit') limit?: string): Promise<Product[]> {
    return this.productService.getFeaturedProducts(limit ? parseInt(limit) : 8);
  }

  @Get('new')
  @ApiOperation({ summary: 'Get new products' })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of products to return', example: 8 })
  @ApiResponse({ status: 200, description: 'New products retrieved successfully' })
  async getNewProducts(@Query('limit') limit?: string): Promise<Product[]> {
    return this.productService.getNewProducts(limit ? parseInt(limit) : 8);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get product by slug' })
  @ApiResponse({ status: 200, description: 'Product retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findBySlug(@Param('slug') slug: string): Promise<Product> {
    return this.productService.findBySlug(slug);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({ status: 200, description: 'Product retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Get(':id/related')
  @ApiOperation({ summary: 'Get related products' })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of products to return', example: 4 })
  @ApiResponse({ status: 200, description: 'Related products retrieved successfully' })
  async getRelatedProducts(
    @Param('id') id: string,
    @Query('limit') limit?: string,
  ): Promise<Product[]> {
    const product = await this.productService.findOne(id);
    return this.productService.getRelatedProducts(
      id,
      product.category_id,
      limit ? parseInt(limit) : 4,
    );
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body(ValidationPipe) createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update product by ID' })
  @ApiResponse({ status: 200, description: 'Product updated successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product by ID' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.productService.remove(id);
    return { message: 'Product deleted successfully' };
  }
} 