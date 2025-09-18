import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { useCart } from '../hooks/useCart';
import { ShippingAddress } from '../types';

type CheckoutScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Checkout'>;

interface Props {
  navigation: CheckoutScreenNavigationProp;
}

export const CheckoutScreen: React.FC<Props> = ({ navigation }) => {
  const { data: cart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('card');

  const totalAmount = cart?.totalAmount || 0;
  const finalTotal = totalAmount + 40 + Math.round(totalAmount * 0.05);

  const handlePlaceOrder = () => {
    // Validate shipping address
    if (!shippingAddress.fullName || !shippingAddress.address || !shippingAddress.city) {
      Alert.alert('Error', 'Please fill in all required shipping information');
      return;
    }

    // In a real app, you would make an API call to create the order
    Alert.alert(
      'Order Placed Successfully!',
      `Your order of ₹${finalTotal} has been placed successfully. You will receive a confirmation email shortly.`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
        },
      ]
    );
  };

  const renderStepIndicator = () => (
    <View className="flex-row items-center justify-center py-6 bg-white">
      {[1, 2, 3].map((step) => (
        <View key={step} className="flex-row items-center">
          <View
            className={`w-8 h-8 rounded-full items-center justify-center ${
              step <= currentStep ? 'bg-primary-500' : 'bg-gray-300'
            }`}
          >
            <Text
              className={`font-bold ${
                step <= currentStep ? 'text-white' : 'text-gray-500'
              }`}
            >
              {step}
            </Text>
          </View>
          {step < 3 && (
            <View
              className={`w-12 h-1 mx-2 ${
                step < currentStep ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            />
          )}
        </View>
      ))}
    </View>
  );

  const renderShippingForm = () => (
    <View className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mx-4 mb-4">
      <Text className="text-lg font-bold text-gray-800 mb-4">
        Shipping Address
      </Text>
      
      <View className="space-y-4">
        <View>
          <Text className="text-gray-700 font-medium mb-2">Full Name *</Text>
          <TextInput
            value={shippingAddress.fullName}
            onChangeText={(text) =>
              setShippingAddress({ ...shippingAddress, fullName: text })
            }
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
            placeholder="Enter your full name"
          />
        </View>
        
        <View>
          <Text className="text-gray-700 font-medium mb-2">Address *</Text>
          <TextInput
            value={shippingAddress.address}
            onChangeText={(text) =>
              setShippingAddress({ ...shippingAddress, address: text })
            }
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
            placeholder="Enter your address"
            multiline
            numberOfLines={2}
          />
        </View>
        
        <View className="flex-row space-x-3">
          <View className="flex-1">
            <Text className="text-gray-700 font-medium mb-2">City *</Text>
            <TextInput
              value={shippingAddress.city}
              onChangeText={(text) =>
                setShippingAddress({ ...shippingAddress, city: text })
              }
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
              placeholder="City"
            />
          </View>
          
          <View className="flex-1">
            <Text className="text-gray-700 font-medium mb-2">State</Text>
            <TextInput
              value={shippingAddress.state}
              onChangeText={(text) =>
                setShippingAddress({ ...shippingAddress, state: text })
              }
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
              placeholder="State"
            />
          </View>
        </View>
        
        <View className="flex-row space-x-3">
          <View className="flex-1">
            <Text className="text-gray-700 font-medium mb-2">ZIP Code</Text>
            <TextInput
              value={shippingAddress.zipCode}
              onChangeText={(text) =>
                setShippingAddress({ ...shippingAddress, zipCode: text })
              }
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
              placeholder="ZIP Code"
              keyboardType="numeric"
            />
          </View>
          
          <View className="flex-1">
            <Text className="text-gray-700 font-medium mb-2">Phone</Text>
            <TextInput
              value={shippingAddress.phone}
              onChangeText={(text) =>
                setShippingAddress({ ...shippingAddress, phone: text })
              }
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
              placeholder="Phone number"
              keyboardType="phone-pad"
            />
          </View>
        </View>
      </View>
    </View>
  );

  const renderPaymentMethods = () => (
    <View className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mx-4 mb-4">
      <Text className="text-lg font-bold text-gray-800 mb-4">
        Payment Method
      </Text>
      
      <View className="space-y-3">
        {[
          { id: 'card', title: 'Credit/Debit Card', icon: 'card' },
          { id: 'upi', title: 'UPI Payment', icon: 'phone-portrait' },
          { id: 'cod', title: 'Cash on Delivery', icon: 'cash' },
        ].map((method) => (
          <TouchableOpacity
            key={method.id}
            onPress={() => setPaymentMethod(method.id)}
            className={`flex-row items-center p-4 rounded-lg border-2 ${
              paymentMethod === method.id
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200'
            }`}
          >
            <Ionicons
              name={method.icon as any}
              size={24}
              color={paymentMethod === method.id ? '#0ea5e9' : '#6b7280'}
            />
            <Text
              className={`ml-3 font-medium ${
                paymentMethod === method.id ? 'text-primary-600' : 'text-gray-700'
              }`}
            >
              {method.title}
            </Text>
            {paymentMethod === method.id && (
              <Ionicons
                name="checkmark-circle"
                size={20}
                color="#0ea5e9"
                style={{ marginLeft: 'auto' }}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderOrderSummary = () => (
    <View className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mx-4 mb-4">
      <Text className="text-lg font-bold text-gray-800 mb-4">
        Order Summary
      </Text>
      
      <View className="space-y-3">
        <View className="flex-row justify-between">
          <Text className="text-gray-600">Items ({cart?.items.length || 0})</Text>
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
            <Text className="text-lg font-bold text-primary-600">₹{finalTotal}</Text>
          </View>
        </View>
      </View>
    </View>
  );

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
          <Text className="text-xl font-bold text-gray-800">Checkout</Text>
        </View>
      </View>

      {renderStepIndicator()}

      <ScrollView className="flex-1">
        {currentStep >= 1 && renderShippingForm()}
        {currentStep >= 2 && renderPaymentMethods()}
        {currentStep >= 3 && renderOrderSummary()}
      </ScrollView>

      {/* Action Buttons */}
      <View className="bg-white border-t border-gray-200 p-4">
        <View className="flex-row space-x-3">
          {currentStep > 1 && (
            <TouchableOpacity
              onPress={() => setCurrentStep(currentStep - 1)}
              className="flex-1 bg-gray-200 py-4 rounded-xl items-center"
            >
              <Text className="text-gray-700 font-semibold">Back</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            onPress={() => {
              if (currentStep < 3) {
                setCurrentStep(currentStep + 1);
              } else {
                handlePlaceOrder();
              }
            }}
            className="flex-1 bg-primary-500 py-4 rounded-xl items-center"
          >
            <Text className="text-white font-semibold text-lg">
              {currentStep < 3 ? 'Continue' : 'Place Order'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};