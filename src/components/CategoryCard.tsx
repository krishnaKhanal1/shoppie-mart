import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

interface CategoryCardProps {
  title: string;
  imageUrl: string;
  onPress: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  imageUrl,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 m-2 items-center w-24"
    >
      <Image
        source={{ uri: imageUrl }}
        className="w-12 h-12 rounded-full mb-2"
        resizeMode="cover"
      />
      <Text className="text-xs font-medium text-gray-700 text-center" numberOfLines={2}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};