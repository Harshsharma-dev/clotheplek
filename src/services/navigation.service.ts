import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NavigationMenu } from '../entities/navigation.entity';
import { CreateNavigationMenuDto, UpdateNavigationMenuDto } from '../dto/navigation.dto';

@Injectable()
export class NavigationService {
  constructor(
    @InjectRepository(NavigationMenu)
    private navigationRepository: Repository<NavigationMenu>,
  ) {}

  async findAll(includeInactive = false): Promise<NavigationMenu[]> {
    const query = this.navigationRepository.createQueryBuilder('navigation');
    
    if (!includeInactive) {
      query.where('navigation.is_active = :isActive', { isActive: true });
    }
    
    return query.orderBy('navigation.sort_order', 'ASC').getMany();
  }

  async getActiveNavigation(): Promise<NavigationMenu[]> {
    return this.navigationRepository.find({
      where: { is_active: true },
      order: { sort_order: 'ASC' },
    });
  }

  async findByKey(key: string): Promise<NavigationMenu> {
    const navigation = await this.navigationRepository.findOne({
      where: { key, is_active: true },
    });

    if (!navigation) {
      throw new NotFoundException(`Navigation menu with key "${key}" not found`);
    }

    return navigation;
  }

  async findOne(id: string): Promise<NavigationMenu> {
    const navigation = await this.navigationRepository.findOne({
      where: { id },
    });

    if (!navigation) {
      throw new NotFoundException(`Navigation menu with ID "${id}" not found`);
    }

    return navigation;
  }

  async create(createNavigationMenuDto: CreateNavigationMenuDto): Promise<NavigationMenu> {
    const navigation = this.navigationRepository.create(createNavigationMenuDto);
    return this.navigationRepository.save(navigation);
  }

  async update(id: string, updateNavigationMenuDto: UpdateNavigationMenuDto): Promise<NavigationMenu> {
    const navigation = await this.findOne(id);
    Object.assign(navigation, updateNavigationMenuDto);
    return this.navigationRepository.save(navigation);
  }

  async remove(id: string): Promise<void> {
    const navigation = await this.findOne(id);
    await this.navigationRepository.remove(navigation);
  }

  // Get navigation data formatted for frontend mega menu
  async getMegaMenuData(): Promise<Record<string, any>> {
    const navigationMenus = await this.getActiveNavigation();
    const megaMenuData: Record<string, any> = {};

    navigationMenus.forEach((menu) => {
      megaMenuData[menu.key] = {
        categories: menu.categories,
        featured: menu.featured,
      };
    });

    return megaMenuData;
  }
} 