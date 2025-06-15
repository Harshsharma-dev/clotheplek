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
import { NavigationService } from '../services/navigation.service';
import { CreateNavigationMenuDto, UpdateNavigationMenuDto } from '../dto/navigation.dto';
import { NavigationMenu } from '../entities/navigation.entity';

@ApiTags('navigation')
@Controller('navigation')
export class NavigationController {
  constructor(private readonly navigationService: NavigationService) {}

  @Get()
  @ApiOperation({ summary: 'Get all navigation menus' })
  @ApiQuery({ name: 'include_inactive', required: false, description: 'Include inactive navigation menus' })
  @ApiResponse({ status: 200, description: 'Navigation menus retrieved successfully' })
  async findAll(@Query('include_inactive') include_inactive?: string): Promise<NavigationMenu[]> {
    return this.navigationService.findAll(include_inactive === 'true');
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active navigation menus only' })
  @ApiResponse({ status: 200, description: 'Active navigation menus retrieved successfully' })
  async getActiveNavigation(): Promise<NavigationMenu[]> {
    return this.navigationService.getActiveNavigation();
  }

  @Get('mega-menu')
  @ApiOperation({ summary: 'Get mega menu data for frontend' })
  @ApiResponse({ status: 200, description: 'Mega menu data retrieved successfully' })
  async getMegaMenuData(): Promise<Record<string, any>> {
    return this.navigationService.getMegaMenuData();
  }

  @Get('key/:key')
  @ApiOperation({ summary: 'Get navigation menu by key' })
  @ApiResponse({ status: 200, description: 'Navigation menu retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Navigation menu not found' })
  async findByKey(@Param('key') key: string): Promise<NavigationMenu> {
    return this.navigationService.findByKey(key);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get navigation menu by ID' })
  @ApiResponse({ status: 200, description: 'Navigation menu retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Navigation menu not found' })
  async findOne(@Param('id') id: string): Promise<NavigationMenu> {
    return this.navigationService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new navigation menu' })
  @ApiResponse({ status: 201, description: 'Navigation menu created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body(ValidationPipe) createNavigationMenuDto: CreateNavigationMenuDto): Promise<NavigationMenu> {
    return this.navigationService.create(createNavigationMenuDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update navigation menu by ID' })
  @ApiResponse({ status: 200, description: 'Navigation menu updated successfully' })
  @ApiResponse({ status: 404, description: 'Navigation menu not found' })
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateNavigationMenuDto: UpdateNavigationMenuDto,
  ): Promise<NavigationMenu> {
    return this.navigationService.update(id, updateNavigationMenuDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete navigation menu by ID' })
  @ApiResponse({ status: 200, description: 'Navigation menu deleted successfully' })
  @ApiResponse({ status: 404, description: 'Navigation menu not found' })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.navigationService.remove(id);
    return { message: 'Navigation menu deleted successfully' };
  }
} 