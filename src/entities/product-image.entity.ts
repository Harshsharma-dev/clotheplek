import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('product_images')
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  image_url: string;

  @Column({ nullable: true })
  alt_text: string;

  @Column({ default: false })
  is_primary: boolean;

  @Column({ default: 0 })
  sort_order: number;

  @ManyToOne(() => Product, product => product.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column('uuid')
  product_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
} 