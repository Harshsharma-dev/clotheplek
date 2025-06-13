import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { Category } from '../entities/category.entity';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const categoryService = app.get(CategoryService);
  const productService = app.get(ProductService);

  console.log('🌱 Starting database seeding...');

  // Create categories
  const categories = [
    {
      name: 'T-Shirts',
      slug: 't-shirts',
      description: 'Comfortable and stylish t-shirts for everyday wear',
      image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      sort_order: 1,
    },
    {
      name: 'Hoodies',
      slug: 'hoodies',
      description: 'Cozy hoodies and sweatshirts for casual comfort',
      image_url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop',
      sort_order: 2,
    },
    {
      name: 'Jeans',
      slug: 'jeans',
      description: 'Premium denim jeans for every occasion',
      image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop',
      sort_order: 3,
    },
    {
      name: 'Shirts',
      slug: 'shirts',
      description: 'Formal and casual shirts for all occasions',
      image_url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=500&fit=crop',
      sort_order: 4,
    },
    {
      name: 'Accessories',
      slug: 'accessories',
      description: 'Stylish accessories to complete your look',
      image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
      sort_order: 5,
    },
  ];

  const createdCategories: Category[] = [];
  for (const categoryData of categories) {
    try {
      const category = await categoryService.create(categoryData);
      createdCategories.push(category);
      console.log(`✅ Created category: ${category.name}`);
    } catch (error) {
      console.log(`⚠️ Category ${categoryData.name} might already exist`);
      const existingCategory = await categoryService.findBySlug(categoryData.slug);
      if (existingCategory) {
        createdCategories.push(existingCategory);
      }
    }
  }

  // Create products
  const products = [
    // T-Shirts
    {
      name: 'Classic White Tee',
      slug: 'classic-white-tee',
      description: 'A timeless white t-shirt made from 100% organic cotton. Perfect for layering or wearing on its own.',
      short_description: 'Timeless white t-shirt in organic cotton',
      price: 25.99,
      sale_price: 19.99,
      stock_status: 'in_stock',
      sku: 'CWT-001',
      material: '100% Organic Cotton',
      care_instructions: 'Machine wash cold, tumble dry low',
      colors: ['White', 'Black', 'Navy'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      is_featured: true,
      is_new: true,
      tags: ['basic', 'cotton', 'casual'],
      brand: 'ClothPlek',
      gender: 'unisex',
      category_id: createdCategories.find(c => c.slug === 't-shirts')?.id,
    },
    {
      name: 'Vintage Band Tee',
      slug: 'vintage-band-tee',
      description: 'Rock your style with this vintage-inspired band t-shirt. Soft, comfortable, and full of character.',
      short_description: 'Vintage-inspired band t-shirt',
      price: 32.99,
      stock_status: 'in_stock',
      sku: 'VBT-001',
      material: '60% Cotton, 40% Polyester',
      care_instructions: 'Machine wash cold, hang dry',
      colors: ['Black', 'Charcoal', 'Burgundy'],
      sizes: ['S', 'M', 'L', 'XL'],
      is_featured: true,
      tags: ['vintage', 'music', 'graphic'],
      brand: 'ClothPlek',
      gender: 'unisex',
      category_id: createdCategories.find(c => c.slug === 't-shirts')?.id,
    },
    // Hoodies
    {
      name: 'Essential Pullover Hoodie',
      slug: 'essential-pullover-hoodie',
      description: 'The perfect hoodie for everyday comfort. Features a kangaroo pocket and adjustable hood.',
      short_description: 'Essential pullover hoodie with kangaroo pocket',
      price: 65.99,
      sale_price: 55.99,
      stock_status: 'in_stock',
      sku: 'EPH-001',
      material: '80% Cotton, 20% Polyester',
      care_instructions: 'Machine wash warm, tumble dry low',
      colors: ['Gray', 'Black', 'Navy', 'Forest Green'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      is_featured: true,
      tags: ['hoodie', 'casual', 'comfort'],
      brand: 'ClothPlek',
      gender: 'unisex',
      category_id: createdCategories.find(c => c.slug === 'hoodies')?.id,
    },
    // Jeans
    {
      name: 'Slim Fit Dark Jeans',
      slug: 'slim-fit-dark-jeans',
      description: 'Premium slim-fit jeans in dark wash. Perfect for both casual and semi-formal occasions.',
      short_description: 'Premium slim-fit jeans in dark wash',
      price: 89.99,
      stock_status: 'in_stock',
      sku: 'SFD-001',
      material: '98% Cotton, 2% Elastane',
      care_instructions: 'Machine wash cold inside out, hang dry',
      colors: ['Dark Blue', 'Black'],
      sizes: ['28', '30', '32', '34', '36', '38'],
      is_featured: true,
      is_new: true,
      tags: ['denim', 'slim-fit', 'premium'],
      brand: 'ClothPlek',
      gender: 'men',
      category_id: createdCategories.find(c => c.slug === 'jeans')?.id,
    },
    // Shirts
    {
      name: 'Oxford Button-Down Shirt',
      slug: 'oxford-button-down-shirt',
      description: 'Classic oxford button-down shirt perfect for office or casual wear. Timeless design with modern fit.',
      short_description: 'Classic oxford button-down shirt',
      price: 79.99,
      stock_status: 'in_stock',
      sku: 'OBD-001',
      material: '100% Cotton Oxford',
      care_instructions: 'Machine wash warm, iron while damp',
      colors: ['White', 'Light Blue', 'Pink'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      is_featured: true,
      tags: ['oxford', 'button-down', 'formal'],
      brand: 'ClothPlek',
      gender: 'men',
      category_id: createdCategories.find(c => c.slug === 'shirts')?.id,
    },
    // More products for variety
    {
      name: 'Oversized Graphic Tee',
      slug: 'oversized-graphic-tee',
      description: 'Trendy oversized graphic tee with modern street-style design. Perfect for a relaxed, contemporary look.',
      short_description: 'Trendy oversized graphic tee',
      price: 35.99,
      stock_status: 'in_stock',
      sku: 'OGT-001',
      material: '100% Cotton',
      care_instructions: 'Machine wash cold, tumble dry low',
      colors: ['White', 'Black', 'Sand'],
      sizes: ['S', 'M', 'L', 'XL'],
      is_new: true,
      tags: ['oversized', 'graphic', 'streetwear'],
      brand: 'ClothPlek',
      gender: 'unisex',
      category_id: createdCategories.find(c => c.slug === 't-shirts')?.id,
    },
    {
      name: 'Zip-Up Hoodie',
      slug: 'zip-up-hoodie',
      description: 'Versatile zip-up hoodie perfect for layering. Features side pockets and ribbed cuffs.',
      short_description: 'Versatile zip-up hoodie with side pockets',
      price: 75.99,
      stock_status: 'in_stock',
      sku: 'ZUH-001',
      material: '70% Cotton, 30% Polyester',
      care_instructions: 'Machine wash cold, tumble dry low',
      colors: ['Gray', 'Black', 'Navy'],
      sizes: ['S', 'M', 'L', 'XL'],
      tags: ['zip-up', 'hoodie', 'layering'],
      brand: 'ClothPlek',
      gender: 'unisex',
      category_id: createdCategories.find(c => c.slug === 'hoodies')?.id,
    },
    {
      name: 'High-Waisted Mom Jeans',
      slug: 'high-waisted-mom-jeans',
      description: 'Vintage-inspired high-waisted mom jeans with a relaxed fit. Perfect for creating retro-chic looks.',
      short_description: 'Vintage-inspired high-waisted mom jeans',
      price: 95.99,
      stock_status: 'in_stock',
      sku: 'HWM-001',
      material: '100% Cotton Denim',
      care_instructions: 'Machine wash cold, hang dry',
      colors: ['Light Blue', 'Medium Blue'],
      sizes: ['24', '26', '28', '30', '32', '34'],
      is_featured: true,
      tags: ['high-waisted', 'mom-jeans', 'vintage'],
      brand: 'ClothPlek',
      gender: 'women',
      category_id: createdCategories.find(c => c.slug === 'jeans')?.id,
    },
  ];

  for (const productData of products) {
    try {
      // Skip product if category not found
      if (!productData.category_id) {
        console.log(`⚠️ Skipping product ${productData.name} - category not found`);
        continue;
      }
      
      // Create a properly typed product data object
      const validProductData = {
        ...productData,
        category_id: productData.category_id as string
      };
      
      const product = await productService.create(validProductData);
      console.log(`✅ Created product: ${product.name}`);
    } catch (error) {
      console.log(`⚠️ Product ${productData.name} might already exist or there's an error:`, error.message);
    }
  }

  console.log('🎉 Database seeding completed!');
  console.log(`📊 Created ${createdCategories.length} categories and ${products.length} products`);
  
  await app.close();
}

seed().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
}); 