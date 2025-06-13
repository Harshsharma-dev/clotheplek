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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';
import { Category } from '../entities/category.entity';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiQuery({ name: 'include_inactive', required: false, description: 'Include inactive categories' })
  @ApiResponse({ status: 200, description: 'Categories retrieved successfully' })
  async findAll(@Query('include_inactive') include_inactive?: string): Promise<Category[]> {
    return this.categoryService.findAll(include_inactive === 'true');
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active categories only' })
  @ApiResponse({ status: 200, description: 'Active categories retrieved successfully' })
  async getActiveCategories(): Promise<Category[]> {
    return this.categoryService.getActiveCategories();
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get category by slug' })
  @ApiResponse({ status: 200, description: 'Category retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async findBySlug(@Param('slug') slug: string): Promise<Category> {
    return this.categoryService.findBySlug(slug);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category by ID' })
  @ApiResponse({ status: 200, description: 'Category retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async findOne(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'Category created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body(ValidationPipe) createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(createCategoryDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update category by ID' })
  @ApiResponse({ status: 200, description: 'Category updated successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete category by ID' })
  @ApiResponse({ status: 200, description: 'Category deleted successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.categoryService.remove(id);
    return { message: 'Category deleted successfully' };
  }
} 