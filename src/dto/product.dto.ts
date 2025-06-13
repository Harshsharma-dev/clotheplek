import { IsString, IsNumber, IsOptional, IsBoolean, IsArray, IsUUID, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Product name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Product slug (URL-friendly name)' })
  @IsString()
  slug: string;

  @ApiProperty({ description: 'Product description' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Short description', required: false })
  @IsOptional()
  @IsString()
  short_description?: string;

  @ApiProperty({ description: 'Product price' })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Sale price', required: false })
  @IsOptional()
  @IsNumber()
  sale_price?: number;

  @ApiProperty({ description: 'Stock status', enum: ['in_stock', 'out_of_stock', 'limited_stock'] })
  @IsEnum(['in_stock', 'out_of_stock', 'limited_stock'])
  stock_status: string;

  @ApiProperty({ description: 'Product SKU', required: false })
  @IsOptional()
  @IsString()
  sku?: string;

  @ApiProperty({ description: 'Material information', required: false })
  @IsOptional()
  @IsString()
  material?: string;

  @ApiProperty({ description: 'Care instructions', required: false })
  @IsOptional()
  @IsString()
  care_instructions?: string;

  @ApiProperty({ description: 'Available colors', required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  colors?: string[];

  @ApiProperty({ description: 'Available sizes', required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sizes?: string[];

  @ApiProperty({ description: 'Is product active', default: true })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiProperty({ description: 'Is product featured', default: false })
  @IsOptional()
  @IsBoolean()
  is_featured?: boolean;

  @ApiProperty({ description: 'Is product new', default: false })
  @IsOptional()
  @IsBoolean()
  is_new?: boolean;

  @ApiProperty({ description: 'Sort order', default: 0 })
  @IsOptional()
  @IsNumber()
  sort_order?: number;

  @ApiProperty({ description: 'Product tags', required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({ description: 'Brand name', required: false })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({ description: 'Gender target', enum: ['men', 'women', 'unisex'], required: false })
  @IsOptional()
  @IsEnum(['men', 'women', 'unisex'])
  gender?: string;

  @ApiProperty({ description: 'Category ID' })
  @IsUUID()
  category_id: string;
}

export class UpdateProductDto {
  @ApiProperty({ description: 'Product name', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Product slug', required: false })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({ description: 'Product description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Short description', required: false })
  @IsOptional()
  @IsString()
  short_description?: string;

  @ApiProperty({ description: 'Product price', required: false })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({ description: 'Sale price', required: false })
  @IsOptional()
  @IsNumber()
  sale_price?: number;

  @ApiProperty({ description: 'Stock status', required: false })
  @IsOptional()
  @IsEnum(['in_stock', 'out_of_stock', 'limited_stock'])
  stock_status?: string;

  @ApiProperty({ description: 'Product SKU', required: false })
  @IsOptional()
  @IsString()
  sku?: string;

  @ApiProperty({ description: 'Material information', required: false })
  @IsOptional()
  @IsString()
  material?: string;

  @ApiProperty({ description: 'Care instructions', required: false })
  @IsOptional()
  @IsString()
  care_instructions?: string;

  @ApiProperty({ description: 'Available colors', required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  colors?: string[];

  @ApiProperty({ description: 'Available sizes', required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sizes?: string[];

  @ApiProperty({ description: 'Is product active', required: false })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiProperty({ description: 'Is product featured', required: false })
  @IsOptional()
  @IsBoolean()
  is_featured?: boolean;

  @ApiProperty({ description: 'Is product new', required: false })
  @IsOptional()
  @IsBoolean()
  is_new?: boolean;

  @ApiProperty({ description: 'Sort order', required: false })
  @IsOptional()
  @IsNumber()
  sort_order?: number;

  @ApiProperty({ description: 'Product tags', required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({ description: 'Brand name', required: false })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({ description: 'Gender target', required: false })
  @IsOptional()
  @IsEnum(['men', 'women', 'unisex'])
  gender?: string;

  @ApiProperty({ description: 'Category ID', required: false })
  @IsOptional()
  @IsUUID()
  category_id?: string;
} 