const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

// Sample product data
const products = [
  // Rice Products
  {
    name: "Premium Basmati Rice",
    description: "Long grain aromatic basmati rice, perfect for biryanis and special occasions. Aged for superior taste and texture.",
    price: 180,
    category: "Rice",
    imageUrl: "https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=500",
    inStock: true,
    rating: 4.8,
    reviews: 245,
    weight: "1kg",
    brand: "Shoppie Mart Premium"
  },
  {
    name: "Organic Brown Rice",
    description: "Nutritious whole grain brown rice, rich in fiber and essential nutrients. Perfect for healthy meals.",
    price: 120,
    category: "Rice",
    imageUrl: "https://images.pexels.com/photos/4198018/pexels-photo-4198018.jpeg?auto=compress&cs=tinysrgb&w=500",
    inStock: true,
    rating: 4.5,
    reviews: 189,
    weight: "1kg",
    brand: "Organic Harvest"
  },
  {
    name: "Jasmine Rice",
    description: "Fragrant jasmine rice with a delicate floral aroma. Ideal for Asian cuisine and everyday meals.",
    price: 150,
    category: "Rice",
    imageUrl: "https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=500",
    inStock: true,
    rating: 4.6,
    reviews: 156,
    weight: "1kg",
    brand: "Golden Grain"
  },

  // Pulses Products
  {
    name: "Toor Dal (Split Pigeon Peas)",
    description: "High-quality toor dal, rich in protein and perfect for making traditional Indian dal preparations.",
    price: 140,
    category: "Pulses",
    imageUrl: "https://images.pexels.com/photos/4198018/pexels-photo-4198018.jpeg?auto=compress&cs=tinysrgb&w=500",
    inStock: true,
    rating: 4.7,
    reviews: 298,
    weight: "1kg",
    brand: "Pure Harvest"
  },
  {
    name: "Moong Dal (Green Gram)",
    description: "Fresh moong dal, easy to digest and perfect for light meals. Rich in protein and fiber.",
    price: 160,
    category: "Pulses",
    imageUrl: "https://images.pexels.com/photos/4198018/pexels-photo-4198018.jpeg?auto=compress&cs=tinysrgb&w=500",
    inStock: true,
    rating: 4.6,
    reviews: 234,
    weight: "1kg",
    brand: "Green Valley"
  },
  {
    name: "Chana Dal (Bengal Gram)",
    description: "Premium quality chana dal with rich taste and high nutritional value. Perfect for various Indian dishes.",
    price: 130,
    category: "Pulses",
    imageUrl: "https://images.pexels.com/photos/4198018/pexels-photo-4198018.jpeg?auto=compress&cs=tinysrgb&w=500",
    inStock: true,
    rating: 4.5,
    reviews: 187,
    weight: "1kg",
    brand: "Golden Harvest"
  },

  // Oil Products
  {
    name: "Extra Virgin Olive Oil",
    description: "Cold-pressed extra virgin olive oil, perfect for cooking and salad dressings. Rich in antioxidants.",
    price: 450,
    category: "Oil",
    imageUrl: "https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=500",
    inStock: true,
    rating: 4.9,
    reviews: 412,
    weight: "500ml",
    brand: "Mediterranean Gold"
  },
  {
    name: "Coconut Oil",
    description: "Pure coconut oil, ideal for cooking and hair care. Natural and unrefined for maximum benefits.",
    price: 280,
    category: "Oil",
    imageUrl: "https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=500",
    inStock: true,
    rating: 4.7,
    reviews: 356,
    weight: "500ml",
    brand: "Tropical Pure"
  },
  {
    name: "Sunflower Oil",
    description: "Light and healthy sunflower oil, perfect for everyday cooking. Low in saturated fats.",
    price: 180,
    category: "Oil",
    imageUrl: "https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=500",
    inStock: true,
    rating: 4.4,
    reviews: 278,
    weight: "1L",
    brand: "Sunny Fields"
  },

  // Spices Products
  {
    name: "Garam Masala Powder",
    description: "Authentic blend of aromatic spices, perfect for enhancing the flavor of Indian dishes.",
    price: 85,
    category: "Spices",
    imageUrl: "https://images.pexels.com/photos/277253/pexels-photo-277253.jpeg?auto=compress&cs=tinysrgb&w=500",
    inStock: true,
    rating: 4.8,
    reviews: 445,
    weight: "100g",
    brand: "Spice Master"
  },
  {
    name: "Turmeric Powder",
    description: "Pure turmeric powder with natural curcumin. Essential for Indian cooking and known for health benefits.",
    price: 65,
    category: "Spices",
    imageUrl: "https://images.pexels.com/photos/277253/pexels-photo-277253.jpeg?auto=compress&cs=tinysrgb&w=500",
    inStock: true,
    rating: 4.7,
    reviews: 389,
    weight: "200g",
    brand: "Golden Spice"
  },
  {
    name: "Red Chili Powder",
    description: "Premium quality red chili powder with perfect heat and color. Essential for spicy Indian cuisine.",
    price: 75,
    category: "Spices",
    imageUrl: "https://images.pexels.com/photos/277253/pexels-photo-277253.jpeg?auto=compress&cs=tinysrgb&w=500",
    inStock: true,
    rating: 4.6,
    reviews: 312,
    weight: "200g",
    brand: "Fire Spice"
  },

  // Additional Products
  {
    name: "Whole Wheat Flour",
    description: "Fresh ground whole wheat flour, perfect for making rotis, bread, and other baked goods.",
    price: 95,
    category: "Grains",
    imageUrl: "https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=500",
    inStock: true,
    rating: 4.5,
    reviews: 267,
    weight: "1kg",
    brand: "Mill Fresh"
  },
  {
    name: "Black Mustard Seeds",
    description: "Premium black mustard seeds for tempering and flavoring. Essential for South Indian cooking.",
    price: 45,
    category: "Spices",
    imageUrl: "https://images.pexels.com/photos/277253/pexels-photo-277253.jpeg?auto=compress&cs=tinysrgb&w=500",
    inStock: false,
    rating: 4.4,
    reviews: 156,
    weight: "100g",
    brand: "Spice Garden"
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shoppiemart', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    await Product.insertMany(products);
    console.log(`Inserted ${products.length} products`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();