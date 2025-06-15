import { IsString, IsArray, IsBoolean, IsOptional, IsNumber, ValidateNested, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class NavigationItemDto {
  @ApiProperty({ description: 'Display name of the navigation item' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'URL/path for the navigation item' })
  @IsString()
  href: string;

  @ApiProperty({ description: 'Optional highlight badge text', required: false })
  @IsOptional()
  @IsString()
  highlight?: string;
}

export class NavigationCategoryDto {
  @ApiProperty({ description: 'Category title' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Array of category items', type: [String] })
  @IsArray()
  @IsString({ each: true })
  items: string[];
}

export class CreateNavigationMenuDto {
  @ApiProperty({ description: 'Unique key for the navigation menu (e.g., men, women, kids)' })
  @IsString()
  key: string;

  @ApiProperty({ description: 'Display name for the navigation menu' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Categories with their items', type: [NavigationCategoryDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NavigationCategoryDto)
  categories: NavigationCategoryDto[];

  @ApiProperty({ description: 'Featured navigation items', type: [NavigationItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NavigationItemDto)
  featured: NavigationItemDto[];

  @ApiProperty({ description: 'Whether the navigation menu is active', default: true })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiProperty({ description: 'Sort order for display', default: 0 })
  @IsOptional()
  @IsNumber()
  sort_order?: number;
}

export class UpdateNavigationMenuDto extends PartialType(CreateNavigationMenuDto) {} 