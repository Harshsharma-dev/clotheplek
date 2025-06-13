import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { ProductImage } from './product-image.entity';
import { ProductVariant } from './product-variant.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column('text')
  description: string;

  @Column('text', { nullable: true })
  short_description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  sale_price: number;

  @Column({ default: 'in_stock' }) // in_stock, out_of_stock, limited_stock
  stock_status: string;

  @Column({ nullable: true })
  sku: string;

  @Column('text', { nullable: true })
  material: string;

  @Column('text', { nullable: true })
  care_instructions: string;

  @Column('simple-array', { nullable: true })
  colors: string[];

  @Column('simple-array', { nullable: true })
  sizes: string[];

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: true })
  is_featured: boolean;

  @Column({ default: false })
  is_new: boolean;

  @Column({ default: 0 })
  sort_order: number;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @Column({ nullable: true })
  brand: string;

  @Column({ nullable: true })
  gender: string; // men, women, unisex

  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column('uuid')
  category_id: string;

  @OneToMany(() => ProductImage, image => image.product, { cascade: true })
  images: ProductImage[];

  @OneToMany(() => ProductVariant, variant => variant.product, { cascade: true })
  variants: ProductVariant[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
} 