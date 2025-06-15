import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export interface NavigationItem {
  name: string;
  href: string;
  highlight?: string;
}

export interface NavigationCategory {
  title: string;
  items: string[];
}

export interface NavigationSection {
  categories: NavigationCategory[];
  featured: NavigationItem[];
}

@Entity('navigation_menus')
export class NavigationMenu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  key: string; // 'men', 'women', 'kids', etc.

  @Column()
  name: string; // Display name

  @Column({ type: 'json' })
  categories: NavigationCategory[];

  @Column({ type: 'json' })
  featured: NavigationItem[];

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: 0 })
  sort_order: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
} 