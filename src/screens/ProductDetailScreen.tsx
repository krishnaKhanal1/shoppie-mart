import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { useProduct } from '../hooks/useProducts';
import { useAddToCart } from '../hooks/useCart';

type ProductDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductDetail'
>;
type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

interface Props {
  navigation: ProductDetailScreenNavigationProp;
  route: ProductDetailScreenRouteProp;
}

const { width } = Dimensions.get('window');

export const ProductDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { productId } = route.params;
  const { data: product, isLoading } = useProduct(productId);
  const addToCartMutation = useAddToCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (product) {
      addToCartMutation.mutate({ productId: product._id, quantity });
    }
  };

  if (isLoading || !product) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <Text className="text-gray-500">Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between p-4 bg-white shadow-sm">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 rounded-full bg-gray-100"
          >
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          
          <Text className="text-lg font-semibold text-gray-800">Product Details</Text>
          
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            className="relative p-2"
          >
            <Ionicons name="cart-outline" size={24} color="#0ea5e9" />
            <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
              <Text className="text-white text-xs font-bold">3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Product Image */}
        <View className="bg-gray-50">
          <Image
            source={{ uri: product.imageUrl }}
            style={{ width, height: width * 0.8 }}
            resizeMode="cover"
          />
          {!product.inStock && (
            <View className="absolute top-4 right-4 bg-red-500 px-3 py-2 rounded-full">
              <Text className="text-white font-medium">Out of Stock</Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View className="p-6">
          <View className="flex-row items-start justify-between mb-4">
            <View className="flex-1 mr-4">
              <Text className="text-2xl font-bold text-gray-800 mb-2">
                {product.name}
              </Text>
              <Text className="text-gray-500 text-base mb-3">
                {product.category}
              </Text>
            </View>
            <Text className="text-3xl font-bold text-primary-600">
              ₹{product.price}
            </Text>
          </View>

          {/* Rating */}
          <View className="flex-row items-center mb-6">
            <View className="flex-row items-center mr-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name="star"
                  size={16}
                  color={star <= Math.floor(product.rating) ? '#fbbf24' : '#e5e7eb'}
                />
              ))}
              <Text className="ml-2 text-gray-600 font-medium">
                {product.rating}
              </Text>
            </View>
            <Text className="text-gray-500">({product.reviews} reviews)</Text>
          </View>

          {/* Description */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-800 mb-3">
              Description
            </Text>
            <Text className="text-gray-600 leading-6">
              {product.description}
            </Text>
          </View>

          {/* Quantity Selector */}
          <View className="mb-8">
            <Text className="text-lg font-semibold text-gray-800 mb-3">
              Quantity
            </Text>
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-gray-100 p-3 rounded-lg"
              >
                <Ionicons name="remove" size={20} color="#6b7280" />
              </TouchableOpacity>
              
              <Text className="mx-6 text-xl font-semibold text-gray-800">
                {quantity}
              </Text>
              
              <TouchableOpacity
                onPress={() => setQuantity(quantity + 1)}
                className="bg-gray-100 p-3 rounded-lg"
              >
                <Ionicons name="add" size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Features */}
          <View className="mb-8">
            <Text className="text-lg font-semibold text-gray-800 mb-4">
              Why Choose This Product?
            </Text>
            <View className="space-y-3">
              <View className="flex-row items-center">
                <View className="bg-green-100 p-2 rounded-full mr-3">
                  <Ionicons name="checkmark" size={16} color="#10b981" />
                </View>
                <Text className="text-gray-600 flex-1">Premium quality guaranteed</Text>
              </View>
              <View className="flex-row items-center">
                <View className="bg-green-100 p-2 rounded-full mr-3">
                  <Ionicons name="checkmark" size={16} color="#10b981" />
                </View>
                <Text className="text-gray-600 flex-1">Fresh and natural</Text>
              </View>
              <View className="flex-row items-center">
                <View className="bg-green-100 p-2 rounded-full mr-3">
                  <Ionicons name="checkmark" size={16} color="#10b981" />
                </View>
                <Text className="text-gray-600 flex-1">Fast delivery available</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Add to Cart Button */}
      <View className="bg-white border-t border-gray-200 p-4">
        <TouchableOpacity
          onPress={handleAddToCart}
          disabled={!product.inStock || addToCartMutation.isPending}
          className={`py-4 rounded-xl flex-row items-center justify-center ${
            product.inStock && !addToCartMutation.isPending
              ? 'bg-primary-500'
              : 'bg-gray-300'
          }`}
        >
          <Ionicons 
            name="cart" 
            size={20} 
            color={product.inStock ? 'white' : 'gray'} 
          />
          <Text className={`ml-2 text-lg font-semibold ${
            product.inStock ? 'text-white' : 'text-gray-500'
          }`}>
            {addToCartMutation.isPending 
              ? 'Adding...' 
              : product.inStock 
                ? `Add to Cart - ₹${product.price * quantity}` 
                : 'Out of Stock'
            }
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};