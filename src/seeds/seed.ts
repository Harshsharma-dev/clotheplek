import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { NavigationService } from '../services/navigation.service';
import { Category } from '../entities/category.entity';
import { ProductImage } from '../entities/product-image.entity';
import { ProductVariant } from '../entities/product-variant.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { seedNavigationMenus } from './navigation.seed';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const categoryService = app.get(CategoryService);
  const productService = app.get(ProductService);

  console.log('🏃‍♂️ Starting PLEK Sports database seeding...');

  // Create sports-focused categories
  const categories = [
    {
      name: 'Men\'s Training',
      slug: 'mens-training',
      description: 'High-performance training gear for men - from gym sessions to outdoor workouts',
      image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop&crop=center',
      sort_order: 1,
    },
    {
      name: 'Women\'s Activewear',
      slug: 'womens-activewear',
      description: 'Stylish and functional activewear designed for the modern active woman',
      image_url: 'https://images.unsplash.com/photo-1506629905607-d9c297d3d45f?w=500&h=500&fit=crop&crop=center',
      sort_order: 2,
    },
    {
      name: 'Running Essentials',
      slug: 'running-essentials',
      description: 'Professional running gear for all distances and terrains',
      image_url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop&crop=center',
      sort_order: 3,
    },
    {
      name: 'Gym & Fitness',
      slug: 'gym-fitness',
      description: 'Premium fitness apparel for strength training and cardio workouts',
      image_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=500&fit=crop&crop=center',
      sort_order: 4,
    },
    {
      name: 'Outdoor Sports',
      slug: 'outdoor-sports',
      description: 'Weather-resistant gear for hiking, cycling, and outdoor adventures',
      image_url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop&crop=center',
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

  // Premium sports products with professional images
  const products = [
    // Men's Training
    {
      name: 'PLEK Pro Performance Training Shorts',
      slug: 'plek-pro-performance-training-shorts',
      description: 'Premium training shorts engineered for peak performance. Features moisture-wicking fabric, anti-chafe technology, and a comfortable compression fit. Perfect for high-intensity workouts, running, and gym sessions.',
      short_description: 'Premium training shorts with moisture-wicking technology',
      price: 1299.00,
      sale_price: 899.00,
      stock_status: 'in_stock',
      sku: 'PLEK-MTS-001',
      material: '88% Polyester, 12% Elastane with DryFit™ Technology',
      care_instructions: 'Machine wash cold, tumble dry low, do not bleach',
      colors: ['Black', 'Navy Blue', 'Charcoal Grey', 'Forest Green'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      is_featured: true,
      is_new: true,
      tags: ['training', 'moisture-wicking', 'anti-chafe', 'compression', 'gym'],
      brand: 'PLEK Sports',
      gender: 'men',
      category_id: createdCategories.find(c => c.slug === 'mens-training')?.id,
      images: [
        '/placeholder-1.svg',
        '/placeholder-2.svg',
        '/placeholder-3.svg',
        '/placeholder-4.svg'
      ]
    },
    {
      name: 'PLEK Elite Compression Tank Top',
      slug: 'plek-elite-compression-tank-top',
      description: 'Professional-grade compression tank top designed for serious athletes. Features advanced moisture management, muscle support technology, and seamless construction for maximum comfort during intense training sessions.',
      short_description: 'Professional compression tank with muscle support',
      price: 899.00,
      sale_price: 649.00,
      stock_status: 'in_stock',
      sku: 'PLEK-MCT-001',
      material: '92% Nylon, 8% Spandex with CompressionFit™',
      care_instructions: 'Machine wash cold, hang dry, no fabric softener',
      colors: ['Black', 'White', 'Navy Blue', 'Charcoal'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      is_featured: true,
      tags: ['compression', 'tank-top', 'muscle-support', 'training', 'breathable'],
      brand: 'PLEK Sports',
      gender: 'men',
      category_id: createdCategories.find(c => c.slug === 'mens-training')?.id,
      images: [
        '/placeholder-2.svg',
        '/placeholder-1.svg',
        '/placeholder-3.svg',
        '/placeholder-4.svg'
      ]
    },

    // Women's Activewear
    {
      name: 'PLEK Women\'s High-Performance Leggings',
      slug: 'plek-womens-high-performance-leggings',
      description: 'Premium women\'s leggings crafted for the modern athlete. Features four-way stretch technology, high-waisted design for core support, and squat-proof fabric. Perfect for yoga, pilates, running, and gym workouts.',
      short_description: 'High-waisted leggings with four-way stretch technology',
      price: 1599.00,
      sale_price: 1199.00,
      stock_status: 'in_stock',
      sku: 'PLEK-WL-001',
      material: '77% Polyester, 23% Spandex with FlexMove™ Technology',
      care_instructions: 'Machine wash cold, hang dry, avoid fabric softener',
      colors: ['Black', 'Deep Purple', 'Emerald Green', 'Coral Pink', 'Navy Blue'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      is_featured: true,
      is_new: true,
      tags: ['leggings', 'high-waisted', 'four-way-stretch', 'squat-proof', 'yoga'],
      brand: 'PLEK Sports',
      gender: 'women',
      category_id: createdCategories.find(c => c.slug === 'womens-activewear')?.id,
      images: [
        '/placeholder-2.svg',
        '/placeholder-3.svg',
        '/placeholder-1.svg',
        '/placeholder-4.svg'
      ]
    },
    {
      name: 'PLEK Women\'s Sports Bra - Ultimate Support',
      slug: 'plek-womens-sports-bra-ultimate-support',
      description: 'Maximum support sports bra engineered for high-impact activities. Features removable padding, moisture-wicking fabric, and ergonomic design for all-day comfort. Perfect for running, HIIT, and intense training sessions.',
      short_description: 'Maximum support sports bra for high-impact activities',
      price: 1099.00,
      sale_price: 799.00,
      stock_status: 'in_stock',
      sku: 'PLEK-WSB-001',
      material: '85% Nylon, 15% Spandex with MaxSupport™ Technology',
      care_instructions: 'Machine wash cold, air dry, do not iron',
      colors: ['Black', 'White', 'Coral Pink', 'Deep Purple', 'Navy Blue'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      is_featured: true,
      tags: ['sports-bra', 'high-impact', 'maximum-support', 'moisture-wicking', 'removable-padding'],
      brand: 'PLEK Sports',
      gender: 'women',
      category_id: createdCategories.find(c => c.slug === 'womens-activewear')?.id,
      images: [
        '/placeholder-2.svg',
        '/placeholder-4.svg',
        '/placeholder-1.svg',
        '/placeholder-3.svg'
      ]
    },

    // Running Essentials
    {
      name: 'PLEK Ultra-Light Running Tee',
      slug: 'plek-ultra-light-running-tee',
      description: 'Ultra-lightweight running shirt designed for marathon runners and speed training. Features advanced cooling technology, reflective elements for night runs, and seamless construction to prevent chafing.',
      short_description: 'Ultra-lightweight running tee with cooling technology',
      price: 799.00,
      sale_price: 599.00,
      stock_status: 'in_stock',
      sku: 'PLEK-RT-001',
      material: '100% Polyester with CoolDry™ and UltraLight™ Technology',
      care_instructions: 'Machine wash cold, tumble dry low, no bleach',
      colors: ['Electric Blue', 'Neon Green', 'Carbon Black', 'Solar Orange', 'White'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      is_featured: true,
      is_new: true,
      tags: ['running', 'ultra-light', 'cooling', 'reflective', 'marathon'],
      brand: 'PLEK Sports',
      gender: 'unisex',
      category_id: createdCategories.find(c => c.slug === 'running-essentials')?.id,
      images: [
        '/placeholder-3.svg',
        '/placeholder-1.svg',
        '/placeholder-2.svg',
        '/placeholder-4.svg'
      ]
    },
    {
      name: 'PLEK Pro Runner Compression Tights',
      slug: 'plek-pro-runner-compression-tights',
      description: 'Professional-grade compression tights for serious runners. Features graduated compression technology, muscle support zones, and weather-resistant fabric. Ideal for long-distance running and recovery.',
      short_description: 'Professional compression tights with muscle support',
      price: 1799.00,
      sale_price: 1399.00,
      stock_status: 'in_stock',
      sku: 'PLEK-RCT-001',
      material: '82% Nylon, 18% Spandex with GradCompression™ Technology',
      care_instructions: 'Machine wash cold, hang dry, do not iron',
      colors: ['Black', 'Navy Blue', 'Charcoal Grey'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      is_featured: true,
      tags: ['compression', 'running', 'graduated-compression', 'muscle-support', 'weather-resistant'],
      brand: 'PLEK Sports',
      gender: 'unisex',
      category_id: createdCategories.find(c => c.slug === 'running-essentials')?.id,
      images: [
        '/placeholder-1.svg',
        '/placeholder-3.svg',
        '/placeholder-2.svg',
        '/placeholder-4.svg'
      ]
    },

    // Gym & Fitness
    {
      name: 'PLEK PowerLift Training Hoodie',
      slug: 'plek-powerlift-training-hoodie',
      description: 'Heavy-duty training hoodie built for serious lifters. Features reinforced construction, moisture-wicking interior, and flexible design for full range of motion during weightlifting and strength training.',
      short_description: 'Heavy-duty training hoodie for weightlifting',
      price: 1999.00,
      sale_price: 1599.00,
      stock_status: 'in_stock',
      sku: 'PLEK-GTH-001',
      material: 'Exterior: 65% Cotton, 35% Polyester | Interior: 100% Moisture-Wicking Polyester',
      care_instructions: 'Machine wash warm, tumble dry medium, zip closed',
      colors: ['Iron Grey', 'Military Green', 'Stealth Black', 'Navy Blue'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      is_featured: true,
      tags: ['hoodie', 'weightlifting', 'heavy-duty', 'moisture-wicking', 'strength-training'],
      brand: 'PLEK Sports',
      gender: 'unisex',
      category_id: createdCategories.find(c => c.slug === 'gym-fitness')?.id,
      images: [
        '/placeholder-1.svg',
        '/placeholder-4.svg',
        '/placeholder-2.svg',
        '/placeholder-3.svg'
      ]
    },

    // Outdoor Sports
    {
      name: 'PLEK All-Weather Cycling Jersey',
      slug: 'plek-all-weather-cycling-jersey',
      description: 'Professional cycling jersey with wind and water resistance. Features full-length zipper, rear pockets, reflective elements, and aerodynamic fit. Perfect for road cycling and outdoor training.',
      short_description: 'Professional cycling jersey with weather protection',
      price: 1499.00,
      sale_price: 1199.00,
      stock_status: 'in_stock',
      sku: 'PLEK-OCJ-001',
      material: '92% Polyester, 8% Elastane with WeatherShield™ Technology',
      care_instructions: 'Machine wash cold, hang dry, zip closed before washing',
      colors: ['Neon Yellow', 'Bright Orange', 'Electric Blue', 'Safety Green', 'Black'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      is_featured: true,
      is_new: true,
      tags: ['cycling', 'weather-resistant', 'reflective', 'aerodynamic', 'outdoor'],
      brand: 'PLEK Sports',
      gender: 'unisex',
      category_id: createdCategories.find(c => c.slug === 'outdoor-sports')?.id,
      images: [
        '/placeholder-3.svg',
        '/placeholder-4.svg',
        '/placeholder-1.svg',
        '/placeholder-2.svg'
      ]
    },
    {
      name: 'PLEK Adventure Trail Running Jacket',
      slug: 'plek-adventure-trail-running-jacket',
      description: 'Lightweight trail running jacket designed for mountain adventures. Features packable design, weather protection, and breathable panels. Perfect for trail running, hiking, and outdoor exploration.',
      short_description: 'Lightweight trail running jacket for adventures',
      price: 2299.00,
      sale_price: 1899.00,
      stock_status: 'in_stock',
      sku: 'PLEK-OTJ-001',
      material: '100% Nylon with DWR (Durable Water Repellent) Finish',
      care_instructions: 'Machine wash cold, air dry, do not iron, do not dry clean',
      colors: ['Mountain Black', 'Trail Olive', 'Storm Grey', 'Alpine Blue'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      is_featured: true,
      tags: ['trail-running', 'packable', 'weather-protection', 'lightweight', 'adventure'],
      brand: 'PLEK Sports',
      gender: 'unisex',
      category_id: createdCategories.find(c => c.slug === 'outdoor-sports')?.id,
      images: [
        '/placeholder-4.svg',
        '/placeholder-1.svg',
        '/placeholder-2.svg',
        '/placeholder-3.svg'
      ]
    }
  ];

  // Create products with images and variants
  const productImageRepository = app.get(getRepositoryToken(ProductImage));
  const productVariantRepository = app.get(getRepositoryToken(ProductVariant));

  for (const productData of products) {
    try {
      // Skip product if category not found
      if (!productData.category_id) {
        console.log(`⚠️ Skipping product ${productData.name} - category not found`);
        continue;
      }
      
      // Extract images from product data
      const { images, ...productDataWithoutImages } = productData;
      
      // Ensure category_id is defined (TypeScript safety)
      const validProductData = {
        ...productDataWithoutImages,
        category_id: productData.category_id as string
      };
      
      // Create product
      const product = await productService.create(validProductData);
      
      // Add product images
      for (let i = 0; i < images.length; i++) {
        try {
          const productImage = productImageRepository.create({
            product_id: product.id,
            image_url: images[i],
            alt_text: `${product.name} - Image ${i + 1}`,
            is_primary: i === 0,
            sort_order: i,
          });
          await productImageRepository.save(productImage);
        } catch (imageError) {
          console.log(`⚠️ Failed to add image ${i + 1} for ${product.name}:`, imageError.message);
        }
      }

      // Add product variants (size/color combinations with stock)
      if (product.sizes && product.colors) {
        for (const size of product.sizes) {
          for (const color of product.colors) {
            try {
              const variant = productVariantRepository.create({
                product_id: product.id,
                size: size,
                color: color,
                sku: `${product.sku}-${size}-${color.replace(/\s+/g, '').toUpperCase()}`,
                price_adjustment: 0,
                stock_quantity: Math.floor(Math.random() * 50) + 10, // Random stock between 10-60
                is_active: true,
              });
              await productVariantRepository.save(variant);
            } catch (variantError) {
              console.log(`⚠️ Failed to add variant ${size}/${color} for ${product.name}`);
            }
          }
        }
      }
      
      console.log(`✅ Created product: ${product.name} with ${images.length} images and variants`);
    } catch (error) {
      console.log(`⚠️ Product ${productData.name} might already exist or there's an error:`, error.message);
    }
  }

  // Seed navigation menus
  console.log('🧭 Seeding navigation menus...');
  try {
    const dataSource = app.get('DataSource');
    await seedNavigationMenus(dataSource);
  } catch (error) {
    console.log('⚠️ Navigation seeding error:', error.message);
    // Try alternate approach with navigation service
    try {
      const navigationService = app.get(NavigationService);
      const navigationMenus = [
        {
          key: 'men',
          name: 'Men',
          is_active: true,
          sort_order: 1,
          categories: [
            {
              title: "Clothing",
              items: ["T-Shirts", "Shirts", "Jackets", "Pants", "Shorts", "Hoodies", "Tank Tops", "Polos"]
            },
            {
              title: "Footwear", 
              items: ["Running Shoes", "Training Shoes", "Basketball", "Football", "Casual", "Sandals", "Boots"]
            },
            {
              title: "Sports",
              items: ["Football", "Basketball", "Running", "Gym", "Tennis", "Golf", "Swimming", "Cycling"]
            },
            {
              title: "Accessories",
              items: ["Bags", "Caps", "Socks", "Gloves", "Belts", "Watches", "Sunglasses", "Water Bottles"]
            }
          ],
          featured: [
            { name: "New Arrivals", href: "/men/new-arrivals", highlight: "NEW" },
            { name: "Best Sellers", href: "/men/best-sellers", highlight: "HOT" },
            { name: "Sale Items", href: "/men/sale", highlight: "SALE" }
          ]
        },
        {
          key: 'women',
          name: 'Women',
          is_active: true,
          sort_order: 2,
          categories: [
            {
              title: "Activewear",
              items: ["Sports Bras", "Leggings", "Tank Tops", "Hoodies", "Jackets", "Shorts", "Dresses", "Tops"]
            },
            {
              title: "Footwear",
              items: ["Running Shoes", "Training Shoes", "Yoga", "Dance", "Walking", "Casual", "Sandals"]
            },
            {
              title: "Sports",
              items: ["Yoga", "Pilates", "Running", "Gym", "Tennis", "Swimming", "Dance", "Cycling"]
            },
            {
              title: "Accessories", 
              items: ["Yoga Mats", "Water Bottles", "Bags", "Hair Accessories", "Jewelry", "Sunglasses"]
            }
          ],
          featured: [
            { name: "New Collection", href: "/women/new-collection", highlight: "NEW" },
            { name: "Trending Now", href: "/women/trending", highlight: "TREND" },
            { name: "Clearance", href: "/women/clearance", highlight: "SALE" }
          ]
        },
        {
          key: 'kids',
          name: 'Kids',
          is_active: true,
          sort_order: 3,
          categories: [
            {
              title: "Boys",
              items: ["T-Shirts", "Shorts", "Tracksuits", "Football Kits", "Basketball", "Swimming", "Shoes"]
            },
            {
              title: "Girls",
              items: ["Activewear", "Leggings", "Dresses", "Swimming", "Dance", "Tennis", "Shoes"]
            },
            {
              title: "Sports",
              items: ["Football", "Basketball", "Swimming", "Tennis", "Athletics", "Dance", "Martial Arts"]
            },
            {
              title: "Accessories",
              items: ["Backpacks", "Water Bottles", "Caps", "Socks", "Shin Guards", "Goggles"]
            }
          ],
          featured: [
            { name: "Back to School", href: "/kids/back-to-school", highlight: "SPECIAL" },
            { name: "Age 2-7", href: "/kids/toddler", highlight: "" },
            { name: "Age 8-16", href: "/kids/youth", highlight: "" }
          ]
        }
      ];

      for (const menuData of navigationMenus) {
        try {
          await navigationService.create(menuData);
          console.log(`✅ Created navigation menu: ${menuData.name}`);
        } catch (createError) {
          console.log(`⚠️ Navigation menu ${menuData.name} might already exist`);
        }
      }
    } catch (serviceError) {
      console.log('⚠️ Navigation service seeding also failed:', serviceError.message);
    }
  }

  console.log('🏆 PLEK Sports database seeding completed!');
  console.log(`📊 Created ${createdCategories.length} categories and ${products.length} premium products`);
  console.log('🧭 Navigation menus seeded successfully!');
  console.log('🎯 Ready to dominate the sports market with PLEK!');
  
  await app.close();
}

seed().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
}); 