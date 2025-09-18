import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useProducts } from '../hooks/useProducts';
import { useAddToCart } from '../hooks/useCart';
import { ProductCard } from '../components/ProductCard';
import { CategoryCard } from '../components/CategoryCard';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const categories = [
  { title: 'Rice', imageUrl: 'https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { title: 'Pulses', imageUrl: 'https://images.pexels.com/photos/4198018/pexels-photo-4198018.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { title: 'Oil', imageUrl: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=200' },
  { title: 'Spices', imageUrl: 'https://images.pexels.com/photos/277253/pexels-photo-277253.jpeg?auto=compress&cs=tinysrgb&w=200' },
];

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { data: products, isLoading, refetch } = useProducts();
  const addToCartMutation = useAddToCart();

  const handleAddToCart = (productId: string) => {
    addToCartMutation.mutate({ productId, quantity: 1 });
  };

  const featuredProducts = products?.slice(0, 6) || [];
  const bestSellers = products?.filter(p => p.rating >= 4.5).slice(0, 4) || [];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      >
        {/* Header */}
        <View className="bg-white px-4 py-6 shadow-sm">
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-2xl font-bold text-gray-800">Shoppie Mart</Text>
              <Text className="text-gray-500">Fresh & Quality Groceries</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Cart')}
              className="relative p-2"
            >
              <Ionicons name="cart-outline" size={28} color="#0ea5e9" />
              <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                <Text className="text-white text-xs font-bold">3</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          {/* Search Bar */}
          <TouchableOpacity className="bg-gray-100 rounded-xl px-4 py-3 flex-row items-center">
            <Ionicons name="search" size={20} color="#6b7280" />
            <Text className="ml-3 text-gray-500">Search for products...</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View className="px-4 py-6">
          <View className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 mb-6">
            <Text className="text-white text-2xl font-bold mb-2">
              Premium Quality
            </Text>
            <Text className="text-white/90 text-base mb-4">
              Fresh groceries delivered to your doorstep
            </Text>
            <TouchableOpacity className="bg-white rounded-lg px-6 py-3 self-start">
              <Text className="text-primary-600 font-semibold">Shop Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 px-4 mb-4">
            Shop by Category
          </Text>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 8 }}
            renderItem={({ item }) => (
              <CategoryCard
                title={item.title}
                imageUrl={item.imageUrl}
                onPress={() => {}}
              />
            )}
            keyExtractor={(item) => item.title}
          />
        </View>

        {/* Best Sellers */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between px-4 mb-4">
            <Text className="text-xl font-bold text-gray-800">Best Sellers</Text>
            <TouchableOpacity>
              <Text className="text-primary-600 font-medium">View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={bestSellers}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 8 }}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                onPress={() => navigation.navigate('ProductDetail', { productId: item._id })}
                onAddToCart={() => handleAddToCart(item._id)}
              />
            )}
            keyExtractor={(item) => item._id}
          />
        </View>

        {/* Featured Products */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 px-4 mb-4">
            Featured Products
          </Text>
          <View className="flex-row flex-wrap justify-center">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onPress={() => navigation.navigate('ProductDetail', { productId: product._id })}
                onAddToCart={() => handleAddToCart(product._id)}
              />
            ))}
          </View>
        </View>

        {/* Quality Promise */}
        <View className="bg-white mx-4 rounded-2xl p-6 mb-6 shadow-sm">
          <View className="items-center">
            <View className="bg-green-100 rounded-full p-4 mb-4">
              <Ionicons name="leaf" size={32} color="#10b981" />
            </View>
            <Text className="text-xl font-bold text-gray-800 mb-2">
              Quality Promise
            </Text>
            <Text className="text-gray-600 text-center leading-6">
              We source the finest quality rice, pulses, and oils directly from trusted farmers and suppliers to ensure freshness and authenticity in every product.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};