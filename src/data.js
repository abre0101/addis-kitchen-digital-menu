// Mock data for Ethiopian restaurant menu
const menuData = [
    // Featured Items
    {
        id: 1,
        name: "Doro Wat",
        category: "mains",
        price: 320,
        description: "Spicy chicken stew slow-cooked in berbere sauce with hard-boiled eggs, served with injera.",
        image: "asset/images.jfif",
        badges: ["spicy", "non-fasting", "featured"],
        category: "mains",
        price: 380,
        description: "Ethiopian steak tartare: minced raw beef mixed with mitmita spice and clarified butter.",
        image: "asset/kitfo.jfif",
        badges: ["spicy", "non-fasting", "featured"],
        available: true,
        featured: true,
        sizes: [
            { name: "Regular", price: 0 },
            { name: "Large", price: 100 }
        ],
        addons: [
            { name: "Extra Ayib (Cheese)", price: 40 },
            { name: "Extra Gomen (Collard Greens)", price: 35 }
        ]
    },
    {
        id: 3,
        name: "Veggie Combo",
        category: "mains",
        price: 270,
        description: "Assortment of misir wat (red lentils), gomen (collard greens), shiro (chickpea stew), and tikil gomen.",
        image: "asset/veggie_combo.jfif",
        badges: ["vegan", "vegetarian", "featured"],
        available: true,
        featured: true,
        sizes: [
            { name: "Small", price: -50 },
            { name: "Regular", price: 0 },
            { name: "Large", price: 80 }
        ],
        addons: [
            { name: "Extra Injera", price: 25 },
            { name: "Add Tofu", price: 60 }
        ]
    },

    // Appetizers
    {
        id: 4,
        name: "Sambusa",
        category: "appetizers",
        price: 90,
        description: "Crispy pastry filled with spiced lentils or beef. Served with awaze dipping sauce.",
        image: "asset/sambusa.jfif",
        badges: ["vegetarian"],
        available: true,
        featured: false,
        sizes: [
            { name: "3 pieces", price: 0 },
            { name: "6 pieces", price: 70 }
        ],
        addons: [
            { name: "Extra Awaze Sauce", price: 20 }
        ]
    },
    {
        id: 5,
        name: "Timatim Salad",
        category: "appetizers",
        price: 110,
        description: "Fresh tomato and onion salad with jalapeños, dressed with lemon and olive oil.",
        image: "asset/timatim.jfif",
        badges: ["vegan", "vegetarian", "gluten-free"],
        available: true,
        featured: false,
        sizes: [
            { name: "Regular", price: 0 }
        ],
        addons: []
    },
    {
        id: 6,
        name: "Azifa",
        category: "appetizers",
        price: 120,
        description: "Cold lentil salad with mustard, jalapeños, onions, and fresh lemon juice.",
        image: "asset/Azifa.jfif",
        badges: ["vegan", "vegetarian", "gluten-free"],
        available: true,
        featured: false,
        sizes: [
            { name: "Regular", price: 0 }
        ],
        addons: []
    },

    // More Mains
    {
        id: 7,
        name: "Tibs",
        category: "mains",
        price: 350,
        description: "Sautéed beef cubes with onions, peppers, tomatoes, and Ethiopian spices.",
        image: "asset/tebs.jfif",
        badges: ["spicy", "gluten-free", "non-fasting"],
        available: true,
        featured: false,
        sizes: [
            { name: "Regular", price: 0 },
            { name: "Large", price: 100 }
        ],
        addons: [
            { name: "Extra Injera", price: 25 },
            { name: "Add Jalapeños", price: 15 }
        ]
    },
    {
        id: 8,
        name: "Yebeg Wat",
        category: "mains",
        price: 420,
        description: "Tender lamb stew cooked in berbere sauce with onions and Ethiopian spices.",
        image: "asset/ye beg wet.jfif",
        badges: ["spicy", "non-fasting"],
        available: true,
        featured: false,
        sizes: [
            { name: "Regular", price: 0 },
            { name: "Large", price: 100 }
        ],
        addons: [
            { name: "Extra Injera", price: 25 }
        ]
    },
    {
        id: 9,
        name: "Gomen Be Siga",
        category: "mains",
        price: 300,
        description: "Collard greens braised with beef, onions, and spices.",
        image: "asset/gomen be sega.jfif",
        badges: ["gluten-free", "non-fasting"],
        name: "Shiro Wat",
        category: "mains",
        price: 220,
        description: "Creamy chickpea flour stew with garlic, onions, and Ethiopian spices.",
        image: "asset/shiro.jfif",
        badges: ["vegan", "vegetarian"],
        available: false,
        featured: false,
        sizes: [
            { name: "Regular", price: 0 },
            { name: "Large", price: 60 }
        ],
        addons: [
            { name: "Extra Injera", price: 25 }
        ]
    },

    // Sides
    {
        id: 11,
        name: "Injera",
        category: "sides",
        price: 50,
        description: "Traditional Ethiopian sourdough flatbread with a slightly spongy texture.",
        image: "asset/injera.jfif",
        badges: ["vegan", "vegetarian"],
        available: true,
        featured: false,
        sizes: [
            { name: "2 pieces", price: 0 },
            { name: "4 pieces", price: 40 }
        ],
        addons: []
    },
    {
        id: 12,
        name: "Ayib",
        category: "sides",
        price: 80,
        description: "Fresh Ethiopian cottage cheese, mildly spiced.",
        image: "asset/ayeb.jfif",
        badges: ["vegetarian", "gluten-free"],
        available: true,
        featured: false,
        sizes: [
            { name: "Regular", price: 0 }
        ],
        addons: []
    },
    {
        id: 13,
        name: "Gomen",
        category: "sides",
        price: 95,
        description: "Braised collard greens seasoned with garlic, ginger, and spices.",
        image: "asset/gomen.jfif",
        badges: ["vegan", "vegetarian", "gluten-free"],
        available: true,
        featured: false,
        sizes: [
            { name: "Regular", price: 0 }
        ],
        addons: []
    },

    // Drinks
    {
        id: 14,
        name: "Ethiopian Coffee",
        category: "drinks",
        price: 70,
        description: "Traditionally roasted and brewed Ethiopian coffee, served in a jebena.",
        image: "asset/buna.jfif",
        badges: ["gluten-free"],
        available: true,
        featured: false,
        sizes: [
            { name: "Small", price: 0 },
            { name: "Large", price: 30 }
        ],
        addons: [
            { name: "Extra Shot", price: 20 }
        ]
    },
    {
        id: 15,
        name: "Tej",
        category: "drinks",
        price: 130,
        description: "Traditional Ethiopian honey wine, slightly sweet with herbal notes.",
        image: "asset/tej.jfif",
        badges: ["gluten-free"],
        available: true,
        featured: false,
        sizes: [
            { name: "Glass", price: 0 },
            { name: "Carafe", price: 200 }
        ],
        addons: []
    },
    {
        id: 16,
        name: "Spris",
        category: "drinks",
        price: 45,
        description: "Refreshing Ethiopian soda in various flavors.",
        image: "asset/spries.jfif",
        badges: ["vegan", "vegetarian", "gluten-free"],
        available: true,
        featured: false,
        sizes: [
            { name: "Regular", price: 0 }
        ],
        addons: []
    },
    {
        id: 17,
        name: "Fresh Mango Juice",
        category: "drinks",
        price: 95,
        description: "Freshly squeezed mango juice, naturally sweet.",
        image: "asset/mango juice.jfif",
        badges: ["vegan", "vegetarian", "gluten-free"],
        available: true,
        featured: false,
        sizes: [
            { name: "Regular", price: 0 },
            { name: "Large", price: 35 }
        ],
        addons: []
    },

    // Desserts
    {
        id: 18,
        name: "Baklava",
        category: "desserts",
        price: 115,
        description: "Layers of phyllo pastry filled with honey and nuts.",
        image: "asset/baklava.jfif",
        badges: ["vegetarian", "nuts"],
        available: true,
        featured: false,
        sizes: [
            { name: "Regular", price: 0 }
        ],
        addons: [
            { name: "Vanilla Ice Cream", price: 45 }
        ]
    },
    {
        id: 19,
        name: "Honey Cake",
        category: "desserts",
        price: 95,
        description: "Moist sponge cake infused with Ethiopian honey.",
        image: "asset/honey cake.jfif",
        badges: ["vegetarian"],
        available: true,
        featured: false,
        sizes: [
            { name: "Regular", price: 0 }
        ],
        addons: [
            { name: "Whipped Cream", price: 25 }
        ]
    },
    {
        id: 20,
        name: "Fresh Fruit Platter",
        category: "desserts",
        price: 130,
        description: "Seasonal fresh fruits including mango, papaya, and pineapple.",
        image: "asset/Fresh Fruit Platter.jfif",
        badges: ["vegan", "vegetarian", "gluten-free"],
        available: true,
        featured: false,
        sizes: [
            { name: "Regular", price: 0 }
        ],
        addons: []
    }
];
