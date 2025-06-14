import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { Category } from '../entities/category.entity';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const categoryService = app.get(CategoryService);
  const productService = app.get(ProductService);

  console.log('🏃‍♂️ Starting SportsTech database seeding...');

  // Create sports-focused categories
  const categories = [
    {
      name: 'Running Gear',
      slug: 'running-gear',
      description: 'High-performance running apparel and accessories for all distances',
      image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop',
      sort_order: 1,
    },
    {
      name: 'Gym & Training',
      slug: 'gym-training',
      description: 'Professional workout clothing for strength training and fitness',
      image_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=500&fit=crop',
      sort_order: 2,
    },
    {
      name: 'Athletic Wear',
      slug: 'athletic-wear',
      description: 'Versatile sportswear for multiple activities and sports',
      image_url: 'https://images.unsplash.com/photo-1506629905607-d3ac882e9f7d?w=500&h=500&fit=crop',
      sort_order: 3,
    },
    {
      name: 'Team Sports',
      slug: 'team-sports',
      description: 'Gear for football, basketball, soccer, and other team sports',
      image_url: 'https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?w=500&h=500&fit=crop',
      sort_order: 4,
    },
    {
      name: 'Outdoor Sports',
      slug: 'outdoor-sports',
      description: 'Weather-resistant gear for hiking, cycling, and outdoor activities',
      image_url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop',
      sort_order: 5,
    },
  ];

  const createdCategories: Category[] = [];
  for (const categoryData of categories) {
    try {
      const category = await categoryService.create(categoryData);
      createdCategories.push(category);
      console.log(`✅ Created sports category: ${category.name}`);
    } catch (error) {
      console.log(`⚠️ Category ${categoryData.name} might already exist`);
      const existingCategory = await categoryService.findBySlug(categoryData.slug);
      if (existingCategory) {
        createdCategories.push(existingCategory);
      }
    }
  }

  // Create sports-focused products
  const products = [
    // Running Gear
    {
      name: 'Elite Performance Running Tee',
      slug: 'elite-performance-running-tee',
      description: 'Ultra-lightweight moisture-wicking running shirt with advanced cooling technology. Designed for marathon runners and sprinters who demand peak performance.',
      short_description: 'Moisture-wicking performance tee with cooling tech',
      price: 45.99,
      sale_price: 35.99,
      stock_status: 'in_stock',
      sku: 'EPR-001',
      material: '88% Polyester, 12% Elastane with CoolDry™ Technology',
      care_instructions: 'Machine wash cold, hang dry, no fabric softener',
      colors: ['Electric Blue', 'Neon Green', 'Carbon Black', 'Solar Orange'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      is_featured: true,
      is_new: true,
      tags: ['running', 'performance', 'moisture-wicking', 'breathable'],
      brand: 'SportsTech',
      gender: 'unisex',
      category_id: createdCategories.find(c => c.slug === 'running-gear')?.id,
    },
    {
      name: 'Pro Runner Compression Shorts',
      slug: 'pro-runner-compression-shorts',
      description: 'Professional-grade compression shorts with graduated compression technology. Features anti-chafe seams and muscle support for enhanced performance.',
      short_description: 'Professional compression shorts with muscle support',
      price: 65.99,
      stock_status: 'in_stock',
      sku: 'PRC-001',
      material: '82% Nylon, 18% Spandex with PowerFlex™ Compression',
      care_instructions: 'Machine wash cold, tumble dry low',
      colors: ['Midnight Black', 'Navy Blue', 'Charcoal Gray'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      is_featured: true,
      tags: ['running', 'compression', 'performance', 'anti-chafe'],
      brand: 'SportsTech',
      gender: 'unisex',
      category_id: createdCategories.find(c => c.slug === 'running-gear')?.id,
    },

    // Gym & Training
    {
      name: 'PowerLift Training Tank',
      slug: 'powerlift-training-tank',
      description: 'Heavy-duty tank top engineered for weightlifting and intense training sessions. Features reinforced seams and maximum range of motion design.',
      short_description: 'Heavy-duty tank for weightlifting and training',
      price: 39.99,
      sale_price: 29.99,
      stock_status: 'in_stock',
      sku: 'PLT-001',
      material: '95% Cotton, 5% Elastane - Heavy Weight Fabric',
      care_instructions: 'Machine wash warm, tumble dry medium',
      colors: ['Iron Gray', 'Military Green', 'Stealth Black', 'White'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      is_featured: true,
      tags: ['gym', 'weightlifting', 'training', 'tank-top'],
      brand: 'SportsTech',
      gender: 'unisex',
      category_id: createdCategories.find(c => c.slug === 'gym-training')?.id,
    },
    {
      name: 'FlexFit Training Leggings',
      slug: 'flexfit-training-leggings',
      description: 'High-performance leggings with four-way stretch technology. Perfect for yoga, CrossFit, and all types of functional training.',
      short_description: 'Four-way stretch leggings for all training types',
      price: 75.99,
      stock_status: 'in_stock',
      sku: 'FFT-001',
      material: '77% Polyester, 23% Spandex with FlexMove™ Technology',
      care_instructions: 'Machine wash cold, hang dry',
      colors: ['Deep Purple', 'Emerald Green', 'Coral Pink', 'Classic Black'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      is_featured: true,
      is_new: true,
      tags: ['leggings', 'yoga', 'crossfit', 'flexibility'],
      brand: 'SportsTech',
      gender: 'women',
      category_id: createdCategories.find(c => c.slug === 'gym-training')?.id,
    },

    // Athletic Wear
    {
      name: 'All-Sport Performance Hoodie',
      slug: 'all-sport-performance-hoodie',
      description: 'Versatile performance hoodie perfect for warm-ups, cool-downs, and casual wear. Features moisture-wicking interior and weather-resistant exterior.',
      short_description: 'Versatile performance hoodie for all activities',
      price: 85.99,
      stock_status: 'in_stock',
      sku: 'ASP-001',
      material: 'Exterior: 65% Polyester, 35% Cotton | Interior: 100% Moisture-Wicking Polyester',
      care_instructions: 'Machine wash cold, tumble dry low',
      colors: ['Athletic Gray', 'Navy Blue', 'Forest Green', 'Burgundy'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      is_featured: true,
      tags: ['hoodie', 'versatile', 'all-sport', 'moisture-wicking'],
      brand: 'SportsTech',
      gender: 'unisex',
      category_id: createdCategories.find(c => c.slug === 'athletic-wear')?.id,
    },
    {
      name: 'Speed Dry Athletic Shorts',
      slug: 'speed-dry-athletic-shorts',
      description: 'Ultra-fast drying shorts with built-in compression briefs. Ideal for running, basketball, tennis, and high-intensity training.',
      short_description: 'Fast-drying shorts with compression briefs',
      price: 49.99,
      stock_status: 'in_stock',
      sku: 'SDA-001',
      material: '88% Polyester, 12% Spandex with HydroDry™ Technology',
      care_instructions: 'Machine wash cold, air dry recommended',
      colors: ['Electric Blue', 'Lime Green', 'Red', 'Black'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      is_new: true,
      tags: ['shorts', 'quick-dry', 'compression', 'multi-sport'],
      brand: 'SportsTech',
      gender: 'men',
      category_id: createdCategories.find(c => c.slug === 'athletic-wear')?.id,
    },

    // Team Sports
    {
      name: 'Team Elite Jersey',
      slug: 'team-elite-jersey',
      description: 'Professional-grade team jersey with advanced breathability and durability. Used by collegiate and semi-professional teams worldwide.',
      short_description: 'Professional team jersey for competitive play',
      price: 55.99,
      sale_price: 45.99,
      stock_status: 'in_stock',
      sku: 'TEJ-001',
      material: '100% Performance Polyester with VentMax™ Mesh Zones',
      care_instructions: 'Machine wash cold, hang dry, avoid bleach',
      colors: ['Royal Blue', 'Red', 'White', 'Kelly Green', 'Purple'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      is_featured: true,
      tags: ['jersey', 'team-sports', 'professional', 'breathable'],
      brand: 'SportsTech',
      gender: 'unisex',
      category_id: createdCategories.find(c => c.slug === 'team-sports')?.id,
    },
    {
      name: 'Championship Warm-Up Jacket',
      slug: 'championship-warm-up-jacket',
      description: 'Premium warm-up jacket with wind-resistant shell and thermal regulation. Perfect for pre-game preparation and sideline wear.',
      short_description: 'Wind-resistant warm-up jacket for teams',
      price: 95.99,
      stock_status: 'in_stock',
      sku: 'CWU-001',
      material: 'Shell: 100% Polyester with WindBlock™ | Lining: Thermal Fleece',
      care_instructions: 'Machine wash cold, tumble dry low, zip all zippers',
      colors: ['Team Navy', 'Championship Black', 'Victory Red'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      tags: ['jacket', 'warm-up', 'wind-resistant', 'team-wear'],
      brand: 'SportsTech',
      gender: 'unisex',
      category_id: createdCategories.find(c => c.slug === 'team-sports')?.id,
    },

    // Outdoor Sports
    {
      name: 'Adventure Trail Running Tights',
      slug: 'adventure-trail-running-tights',
      description: 'Rugged trail running tights with reinforced knees and weather protection. Designed for mountain running and outdoor adventures.',
      short_description: 'Weather-resistant trail running tights',
      price: 89.99,
      stock_status: 'in_stock',
      sku: 'ATR-001',
      material: '85% Nylon, 15% Spandex with DWR (Durable Water Repellent) Finish',
      care_instructions: 'Machine wash cold, air dry, do not iron',
      colors: ['Mountain Black', 'Trail Olive', 'Storm Gray'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      is_featured: true,
      is_new: true,
      tags: ['trail-running', 'outdoor', 'weather-resistant', 'adventure'],
      brand: 'SportsTech',
      gender: 'unisex',
      category_id: createdCategories.find(c => c.slug === 'outdoor-sports')?.id,
    },
    {
      name: 'All-Weather Cycling Jersey',
      slug: 'all-weather-cycling-jersey',
      description: 'Advanced cycling jersey with wind and water resistance. Features full-length zipper, rear pockets, and reflective elements for safety.',
      short_description: 'Wind and water resistant cycling jersey',
      price: 79.99,
      sale_price: 69.99,
      stock_status: 'in_stock',
      sku: 'AWC-001',
      material: '92% Polyester, 8% Elastane with WeatherShield™ Technology',
      care_instructions: 'Machine wash cold, hang dry, zip closed before washing',
      colors: ['Neon Yellow', 'Bright Orange', 'Electric Blue', 'Safety Green'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      tags: ['cycling', 'weather-resistant', 'reflective', 'outdoor'],
      brand: 'SportsTech',
      gender: 'unisex',
      category_id: createdCategories.find(c => c.slug === 'outdoor-sports')?.id,
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
      console.log(`✅ Created sports product: ${product.name}`);
    } catch (error) {
      console.log(`⚠️ Product ${productData.name} might already exist or there's an error:`, error.message);
    }
  }

  console.log('🏆 SportsTech database seeding completed!');
  console.log(`📊 Created ${createdCategories.length} sports categories and ${products.length} performance products`);
  console.log('🎯 Ready to dominate the sports market!');
  
  await app.close();
}

seed().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
}); 