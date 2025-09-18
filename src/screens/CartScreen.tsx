import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { useCart, useUpdateCartItem, useRemoveFromCart } from '../hooks/useCart';
import { CartItem } from '../components/CartItem';

type CartScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Cart'>;

interface Props {
  navigation: CartScreenNavigationProp;
}

export const CartScreen: React.FC<Props> = ({ navigation }) => {
  const { data: cart, isLoading } = useCart();
  const updateCartItemMutation = useUpdateCartItem();
  const removeFromCartMutation = useRemoveFromCart();

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateCartItemMutation.mutate({ productId, quantity });
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCartMutation.mutate(productId);
  };

  const handleCheckout = () => {
    navigation.navigate('Checkout');
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <Text className="text-gray-500">Loading cart...</Text>
      </SafeAreaView>
    );
  }

  const cartItems = cart?.items || [];
  const totalAmount = cart?.totalAmount || 0;
  const isEmpty = cartItems.length === 0;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 py-4 shadow-sm">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 rounded-full bg-gray-100 mr-4"
          >
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-800">Shopping Cart</Text>
        </View>
      </View>

      {isEmpty ? (
        <View className="flex-1 items-center justify-center px-6">
          <View className="bg-gray-100 rounded-full p-8 mb-6">
            <Ionicons name="cart-outline" size={64} color="#9ca3af" />
          </View>
          <Text className="text-2xl font-bold text-gray-800 mb-3">
            Your cart is empty
          </Text>
          <Text className="text-gray-500 text-center mb-8 leading-6">
            Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            className="bg-primary-500 px-8 py-4 rounded-xl"
          >
            <Text className="text-white font-semibold text-lg">Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView className="flex-1 py-4">
            <FlatList
              data={cartItems}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <CartItem
                  item={item}
                  onUpdateQuantity={(quantity) =>
                    handleUpdateQuantity(item.product._id, quantity)
                  }
                  onRemove={() => handleRemoveItem(item.product._id)}
                />
              )}
              keyExtractor={(item) => item.product._id}
            />

            {/* Order Summary */}
            <View className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mx-4 mt-4">
              <Text className="text-lg font-bold text-gray-800 mb-4">
                Order Summary
              </Text>
              
              <View className="space-y-3">
                <View className="flex-row justify-between">
                  <Text className="text-gray-600">Subtotal</Text>
                  <Text className="font-medium text-gray-800">₹{totalAmount}</Text>
                </View>
                
                <View className="flex-row justify-between">
                  <Text className="text-gray-600">Delivery Fee</Text>
                  <Text className="font-medium text-gray-800">₹40</Text>
                </View>
                
                <View className="flex-row justify-between">
                  <Text className="text-gray-600">Tax</Text>
                  <Text className="font-medium text-gray-800">₹{Math.round(totalAmount * 0.05)}</Text>
                </View>
                
                <View className="border-t border-gray-200 pt-3">
                  <View className="flex-row justify-between">
                    <Text className="text-lg font-bold text-gray-800">Total</Text>
                    <Text className="text-lg font-bold text-primary-600">
                      ₹{totalAmount + 40 + Math.round(totalAmount * 0.05)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Delivery Info */}
            <View className="bg-blue-50 rounded-xl border border-blue-200 p-4 mx-4 mt-4 mb-6">
              <View className="flex-row items-center">
                <View className="bg-blue-100 p-2 rounded-full mr-3">
                  <Ionicons name="time" size={16} color="#3b82f6" />
                </View>
                <View className="flex-1">
                  <Text className="font-medium text-blue-800">Fast Delivery</Text>
                  <Text className="text-blue-600 text-sm">
                    Get your order delivered within 2-3 hours
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Checkout Button */}
          <View className="bg-white border-t border-gray-200 p-4">
            <TouchableOpacity
              onPress={handleCheckout}
              className="bg-primary-500 py-4 rounded-xl flex-row items-center justify-center"
            >
              <Ionicons name="card" size={20} color="white" />
              <Text className="ml-2 text-white text-lg font-semibold">
                Proceed to Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};