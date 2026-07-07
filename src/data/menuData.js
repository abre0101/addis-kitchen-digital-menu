export const menuData = [
  {
    id: 1,
    name: "Doro Wat",
    description: "Spicy chicken stew with hard-boiled eggs, simmered in berbere sauce",
    price: 18.99,
    category: "Mains",
    image: "https://picsum.photos/seed/dorowat/400/300",
    tags: ["🌶️ Spicy"],
    available: true,
    featured: true,
    sizes: [
      { name: "Regular", price: 0 },
      { name: "Large", price: 4.00 }
    ],
    addons: [
      { name: "Extra Egg", price: 2.00 },
      { name: "Side Salad", price: 3.50 }
    ]
  },
  {
    id: 2,
    name: "Kitfo",
    description: "Ethiopian-style steak tartare with mitmita spice and clarified butter",
    price: 22.99,
    category: "Mains",
    image: "https://picsum.photos/seed/kitfo/400/300",
    tags: ["🌶️ Spicy"],
    available: true,
    featured: true,
    sizes: [
      { name: "Regular", price: 0 },
      { name: "Large", price: 5.00 }
    ],
    addons: [
      { name: "Extra Ayib (Cheese)", price: 2.50 },
      { name: "Gomen (Collard Greens)", price: 3.00 }
    ]
  },
  {
    id: 3,
    name: "Misir Wat",
    description: "Red lentil stew in spicy berbere sauce",
    price: 14.99,
    category: "Mains",
    image: "https://picsum.photos/seed/misirwat/400/300",
    tags: ["🌱 Vegan", "🌶️ Spicy"],
    available: true,
    featured: false,
    sizes: [{ name: "Regular", price: 0 }],
    addons: []
  },
  {
    id: 4,
    name: "Tibs",
    description: "Sautéed beef with onions, peppers and rosemary",
    price: 19.99,
    category: "Mains",
    image: "https://picsum.photos/seed/tibs/400/300",
    tags: [],
    available: true,
    featured: false,
    sizes: [
      { name: "Regular", price: 0 },
      { name: "Large", price: 4.50 }
    ],
    addons: [
      { name: "Extra Injera", price: 2.00 }
    ]
  },
  {
    id: 5,
    name: "Gomen",
    description: "Collard greens sautéed with garlic, ginger and spices",
    price: 12.99,
    category: "Appetizers",
    image: "https://picsum.photos/seed/gomen/400/300",
    tags: ["🌱 Vegan"],
    available: true,
    featured: false,
    sizes: [{ name: "Regular", price: 0 }],
    addons: []
  },
  {
    id: 6,
    name: "Sambusa",
    description: "Crispy pastry filled with spiced lentils or beef",
    price: 7.99,
    category: "Appetizers",
    image: "https://picsum.photos/seed/sambusa/400/300",
    tags: [],
    available: true,
    featured: true,
    sizes: [{ name: "3 pieces", price: 0 }, { name: "6 pieces", price: 6.00 }],
    addons: []
  },
  {
    id: 7,
    name: "Ayib",
    description: "Fresh Ethiopian cottage cheese",
    price: 6.99,
    category: "Appetizers",
    image: "https://picsum.photos/seed/ayib/400/300",
    tags: [],
    available: true,
    featured: false,
    sizes: [{ name: "Regular", price: 0 }],
    addons: []
  },
  {
    id: 8,
    name: "Shiro Wat",
    description: "Creamy chickpea flour stew",
    price: 13.99,
    category: "Mains",
    image: "https://picsum.photos/seed/shirowat/400/300",
    tags: ["🌱 Vegan"],
    available: false,
    featured: false,
    sizes: [{ name: "Regular", price: 0 }],
    addons: []
  },
  {
    id: 9,
    name: "Baklava",
    description: "Sweet pastry with honey and nuts",
    price: 6.99,
    category: "Desserts",
    image: "https://picsum.photos/seed/baklava/400/300",
    tags: ["🥜 Contains nuts"],
    available: true,
    featured: false,
    sizes: [{ name: "Regular", price: 0 }],
    addons: []
  },
  {
    id: 10,
    name: "Ethiopian Coffee",
    description: "Traditionally roasted and brewed coffee",
    price: 4.99,
    category: "Drinks",
    image: "https://picsum.photos/seed/coffee/400/300",
    tags: [],
    available: true,
    featured: true,
    sizes: [{ name: "Regular", price: 0 }, { name: "Large", price: 1.50 }],
    addons: []
  },
  {
    id: 11,
    name: "Tej",
    description: "Traditional Ethiopian honey wine",
    price: 8.99,
    category: "Drinks",
    image: "https://picsum.photos/seed/tej/400/300",
    tags: [],
    available: true,
    featured: false,
    sizes: [{ name: "Glass", price: 0 }, { name: "Bottle", price: 25.00 }],
    addons: []
  },
  {
    id: 12,
    name: "Fresh Mango Juice",
    description: "Freshly squeezed mango juice",
    price: 5.99,
    category: "Drinks",
    image: "https://picsum.photos/seed/mango/400/300",
    tags: ["🌱 Vegan"],
    available: true,
    featured: false,
    sizes: [{ name: "Regular", price: 0 }],
    addons: []
  }
];

export const categories = ["Appetizers", "Mains", "Desserts", "Drinks"];
