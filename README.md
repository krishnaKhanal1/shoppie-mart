# Shoppie Mart - Mobile E-commerce Application

A comprehensive mobile e-commerce application built with Expo, TypeScript, and Node.js, focusing on grocery items like rice, pulses, and oils.

## 🚀 Features

### Frontend (Mobile App)
- **Modern UI/UX**: Clean, responsive design using NativeWind (Tailwind CSS for React Native)
- **Product Catalog**: Browse products by categories with high-quality images
- **Product Details**: Detailed product pages with descriptions, ratings, and reviews
- **Shopping Cart**: Add, update, and remove items with real-time total calculations
- **Multi-step Checkout**: Comprehensive checkout process with shipping and payment options
- **State Management**: Efficient data fetching and caching with React Query

### Backend (Node.js API)
- **RESTful API**: Well-structured endpoints for products, cart, and orders
- **MongoDB Integration**: Robust database schema with proper relationships
- **Data Validation**: Input validation and error handling
- **Scalable Architecture**: Modular code structure for easy maintenance

## 🛠 Technology Stack

### Frontend
- **Expo** - Cross-platform mobile development
- **TypeScript** - Type-safe JavaScript
- **React Navigation** - Navigation library
- **NativeWind** - Tailwind CSS for React Native
- **React Query** - Data fetching and state management
- **Expo Vector Icons** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

## 📱 Screenshots & Features

### Homepage
- Hero section showcasing quality promise
- Category navigation (Rice, Pulses, Oil, Spices)
- Featured products and best sellers
- Search functionality
- Quality assurance messaging

### Product Detail Page
- High-resolution product images
- Detailed descriptions and specifications
- Star ratings and review counts
- Quantity selector
- Add to cart functionality
- Product features and benefits

### Shopping Cart
- Item management (add, update, remove)
- Real-time total calculations
- Order summary with taxes and delivery fees
- Empty cart state with call-to-action

### Checkout Process
- Multi-step checkout (Shipping → Payment → Review)
- Shipping address form with validation
- Multiple payment options (Card, UPI, Cash on Delivery)
- Order summary and confirmation

## 🗄 Database Schema

### Products
- Name, description, price, category
- Image URLs, stock status
- Ratings, reviews, weight, brand
- Timestamps for tracking

### Cart
- User association
- Product items with quantities
- Automatic total calculation
- Real-time updates

### Orders
- Complete order history
- Shipping address details
- Payment method tracking
- Order status management
- Item details with prices at time of purchase

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Expo CLI
- iOS Simulator or Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ShoppieMart
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   ```

5. **Seed the database**
   ```bash
   npm run seed
   ```

6. **Start the backend server**
   ```bash
   npm run start:backend
   ```

7. **Start the mobile app**
   ```bash
   # In the root directory
   npm start
   ```

## 📁 Project Structure

```
ShoppieMart/
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/            # Screen components
│   ├── navigation/         # Navigation configuration
│   ├── hooks/              # Custom React hooks
│   ├── api/                # API client and queries
│   └── types/              # TypeScript type definitions
├── backend/
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API route handlers
│   ├── scripts/            # Database seeding scripts
│   └── server.js           # Express server setup
└── assets/                 # Static assets
```

## 🎨 Design Philosophy

The application follows modern mobile design principles:

- **Apple-level aesthetics** with attention to detail
- **Consistent spacing** using 8px grid system
- **Comprehensive color system** with primary, secondary, and semantic colors
- **Responsive design** that works across all device sizes
- **Micro-interactions** and smooth animations
- **Accessibility** considerations throughout

## 🔧 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category

### Cart
- `GET /api/cart/:userId` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove` - Remove item from cart

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:userId` - Get user's orders
- `GET /api/orders/order/:orderId` - Get specific order

## 🌟 Key Features Implemented

1. **Quality-focused Homepage** - Emphasizes food quality and project beauty
2. **Comprehensive Product Catalog** - Rice, pulses, oils with detailed information
3. **Smart Cart Management** - Real-time updates and calculations
4. **Multi-step Checkout** - Professional checkout flow
5. **Responsive Design** - Works perfectly on all mobile devices
6. **Type Safety** - Full TypeScript implementation
7. **Error Handling** - Comprehensive error states and loading indicators
8. **Performance Optimized** - React Query for efficient data management

## 🚀 Deployment Considerations

### Image Storage
Currently using Pexels URLs for product images. For production, consider:
- **Cloud Storage**: AWS S3, Google Cloud Storage, or Cloudinary
- **CDN Integration**: For faster image loading
- **Image Optimization**: Multiple sizes for different screen densities

### Database
- **Production MongoDB**: MongoDB Atlas for cloud hosting
- **Indexing**: Add indexes for frequently queried fields
- **Backup Strategy**: Regular automated backups

### API Security
- **Authentication**: JWT-based user authentication
- **Rate Limiting**: Prevent API abuse
- **Input Validation**: Comprehensive request validation
- **HTTPS**: SSL certificates for secure communication

## 📈 Future Enhancements

1. **User Authentication** - Login/signup functionality
2. **Order Tracking** - Real-time order status updates
3. **Push Notifications** - Order updates and promotions
4. **Wishlist Feature** - Save products for later
5. **Reviews System** - User-generated product reviews
6. **Search & Filters** - Advanced product search
7. **Payment Integration** - Real payment gateway integration
8. **Admin Panel** - Product and order management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Shoppie Mart** - Bringing quality groceries to your doorstep with a beautiful, modern mobile experience! 🛒✨