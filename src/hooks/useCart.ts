import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api/client';

const MOCK_USER_ID = 'user123'; // In a real app, this would come from authentication

export const useCart = () => {
  return useQuery({
    queryKey: ['cart', MOCK_USER_ID],
    queryFn: () => apiClient.getCart(MOCK_USER_ID),
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      apiClient.addToCart(MOCK_USER_ID, productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', MOCK_USER_ID] });
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      apiClient.updateCartItem(MOCK_USER_ID, productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', MOCK_USER_ID] });
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (productId: string) =>
      apiClient.removeFromCart(MOCK_USER_ID, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', MOCK_USER_ID] });
    },
  });
};