import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Category name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Category slug (URL-friendly name)' })
  @IsString()
  slug: string;

  @ApiProperty({ description: 'Category description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Category image URL', required: false })
  @IsOptional()
  @IsString()
  image_url?: string;

  @ApiProperty({ description: 'Is category active', default: true })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiProperty({ description: 'Sort order', default: 0 })
  @IsOptional()
  @IsNumber()
  sort_order?: number;
}

export class UpdateCategoryDto {
  @ApiProperty({ description: 'Category name', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Category slug', required: false })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({ description: 'Category description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Category image URL', required: false })
  @IsOptional()
  @IsString()
  image_url?: string;

  @ApiProperty({ description: 'Is category active', required: false })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiProperty({ description: 'Sort order', required: false })
  @IsOptional()
  @IsNumber()
  sort_order?: number;
} 