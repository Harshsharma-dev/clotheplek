import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('product_variants')
export class ProductVariant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  size: string;

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  sku: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  price_adjustment: number; // Price difference from base product

  @Column({ default: 0 })
  stock_quantity: number;

  @Column({ default: true })
  is_active: boolean;

  @Column({ nullable: true })
  image_url: string; // Specific variant image

  @ManyToOne(() => Product, product => product.variants, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column('uuid')
  product_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
} 