import { DataSource } from 'typeorm';
import { NavigationMenu } from '../entities/navigation.entity';

export const seedNavigationMenus = async (dataSource: DataSource) => {
  const navigationRepository = dataSource.getRepository(NavigationMenu);

  // Check if navigation menus already exist
  const existingMenus = await navigationRepository.count();
  if (existingMenus > 0) {
    console.log('Navigation menus already seeded');
    return;
  }

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

  // Create and save navigation menus
  for (const menuData of navigationMenus) {
    const menu = navigationRepository.create(menuData);
    await navigationRepository.save(menu);
    console.log(`Created navigation menu: ${menuData.name}`);
  }

  console.log('Navigation menus seeded successfully');
}; 