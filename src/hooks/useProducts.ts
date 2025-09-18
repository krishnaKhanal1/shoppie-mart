import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import { Product } from '../types';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => apiClient.getProducts(),
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => apiClient.getProduct(id),
    enabled: !!id,
  });
};

export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => apiClient.getProductsByCategory(category),
    enabled: !!category,
  });
};