import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CartItem as CartItemType } from '../types';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const { product, quantity } = item;

  return (
    <View className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-3 mx-4">
      <View className="flex-row">
        <Image
          source={{ uri: product.imageUrl }}
          className="w-20 h-20 rounded-lg mr-4"
          resizeMode="cover"
        />
        
        <View className="flex-1">
          <Text className="font-semibold text-gray-800 text-base mb-1" numberOfLines={2}>
            {product.name}
          </Text>
          
          <Text className="text-gray-500 text-sm mb-2">
            {product.category}
          </Text>
          
          <Text className="font-bold text-primary-600 text-lg mb-3">
            ₹{product.price}
          </Text>
          
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center bg-gray-100 rounded-lg">
              <TouchableOpacity
                onPress={() => onUpdateQuantity(Math.max(1, quantity - 1))}
                className="p-2"
              >
                <Ionicons name="remove" size={16} color="#6b7280" />
              </TouchableOpacity>
              
              <Text className="px-4 py-2 font-medium text-gray-800">
                {quantity}
              </Text>
              
              <TouchableOpacity
                onPress={() => onUpdateQuantity(quantity + 1)}
                className="p-2"
              >
                <Ionicons name="add" size={16} color="#6b7280" />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity
              onPress={onRemove}
              className="p-2"
            >
              <Ionicons name="trash-outline" size={20} color="#ef4444" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};