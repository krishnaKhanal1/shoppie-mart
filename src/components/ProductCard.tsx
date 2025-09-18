import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  onAddToCart: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onAddToCart,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 m-2 w-44"
    >
      <View className="relative">
        <Image
          source={{ uri: product.imageUrl }}
          className="w-full h-32 rounded-lg mb-3"
          resizeMode="cover"
        />
        {!product.inStock && (
          <View className="absolute top-2 right-2 bg-red-500 px-2 py-1 rounded-full">
            <Text className="text-white text-xs font-medium">Out of Stock</Text>
          </View>
        )}
      </View>
      
      <Text className="font-semibold text-gray-800 text-sm mb-1" numberOfLines={2}>
        {product.name}
      </Text>
      
      <Text className="text-gray-500 text-xs mb-2" numberOfLines={1}>
        {product.category}
      </Text>
      
      <View className="flex-row items-center mb-2">
        <View className="flex-row items-center mr-2">
          <Ionicons name="star" size={12} color="#fbbf24" />
          <Text className="text-xs text-gray-600 ml-1">{product.rating}</Text>
        </View>
        <Text className="text-xs text-gray-500">({product.reviews})</Text>
      </View>
      
      <View className="flex-row items-center justify-between">
        <Text className="font-bold text-primary-600 text-lg">
          ₹{product.price}
        </Text>
        
        <TouchableOpacity
          onPress={onAddToCart}
          disabled={!product.inStock}
          className={`p-2 rounded-full ${
            product.inStock 
              ? 'bg-primary-500' 
              : 'bg-gray-300'
          }`}
        >
          <Ionicons 
            name="add" 
            size={16} 
            color={product.inStock ? 'white' : 'gray'} 
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};