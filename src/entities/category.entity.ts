import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  image_url: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: 0 })
  sort_order: number;

  @OneToMany(() => Product, product => product.category)
  products: Product[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
} 