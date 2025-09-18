import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

const API_BASE_URL = 'http://localhost:3001/api';

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Products
  getProducts() {
    return this.request<any[]>('/products');
  }

  getProduct(id: string) {
    return this.request<any>(`/products/${id}`);
  }

  getProductsByCategory(category: string) {
    return this.request<any[]>(`/products/category/${category}`);
  }

  // Cart
  getCart(userId: string) {
    return this.request<any>(`/cart/${userId}`);
  }

  addToCart(userId: string, productId: string, quantity: number) {
    return this.request<any>('/cart/add', {
      method: 'POST',
      body: JSON.stringify({ userId, productId, quantity }),
    });
  }

  updateCartItem(userId: string, productId: string, quantity: number) {
    return this.request<any>('/cart/update', {
      method: 'PUT',
      body: JSON.stringify({ userId, productId, quantity }),
    });
  }

  removeFromCart(userId: string, productId: string) {
    return this.request<any>('/cart/remove', {
      method: 'DELETE',
      body: JSON.stringify({ userId, productId }),
    });
  }

  // Orders
  createOrder(orderData: any) {
    return this.request<any>('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  getOrders(userId: string) {
    return this.request<any[]>(`/orders/${userId}`);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);