import { Customer, Order, DashboardStats, User } from '@/types';

// API基础URL
const API_BASE_URL = 'http://localhost:5000/api';

// 获取认证token
const getAuthToken = (): string | null => {
  const user = localStorage.getItem('user');
  if (user) {
    try {
      const parsedUser = JSON.parse(user);
      return parsedUser.token || null;
    } catch (error) {
      console.error('Failed to parse stored user data', error);
      return null;
    }
  }
  return null;
};

// 创建请求头
const createHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// 处理API响应
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(errorData.message || `API error: ${response.status}`);
  }
  return response.json();
};

// 认证API
export const login = async (email: string, password: string): Promise<{ user: User; token: string }> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: createHeaders(),
    body: JSON.stringify({ email, password }),
  });
  
  return handleResponse<{ user: User; token: string }>(response);
};

export const register = async (name: string, email: string, password: string): Promise<{ user: User; token: string }> => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: createHeaders(),
    body: JSON.stringify({ name, email, password }),
  });
  
  return handleResponse<{ user: User; token: string }>(response);
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: createHeaders(),
  });
  
  return handleResponse<User>(response);
};

// Dashboard API
export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
    headers: createHeaders(),
  });
  
  return handleResponse<DashboardStats>(response);
};

// Customer APIs
export const getCustomers = async (): Promise<Customer[]> => {
  const response = await fetch(`${API_BASE_URL}/customers`, {
    headers: createHeaders(),
  });
  
  return handleResponse<Customer[]>(response);
};

export const getCustomer = async (id: string): Promise<Customer> => {
  const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
    headers: createHeaders(),
  });
  
  return handleResponse<Customer>(response);
};

export const createCustomer = async (customer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Promise<Customer> => {
  const response = await fetch(`${API_BASE_URL}/customers`, {
    method: 'POST',
    headers: createHeaders(),
    body: JSON.stringify(customer),
  });
  
  return handleResponse<Customer>(response);
};

export const updateCustomer = async (id: string, data: Partial<Customer>): Promise<Customer> => {
  const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
    method: 'PUT',
    headers: createHeaders(),
    body: JSON.stringify(data),
  });
  
  return handleResponse<Customer>(response);
};

export const deleteCustomer = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
    method: 'DELETE',
    headers: createHeaders(),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(errorData.message || `API error: ${response.status}`);
  }
};

// Order APIs
export const getOrders = async (): Promise<Order[]> => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    headers: createHeaders(),
  });
  
  return handleResponse<Order[]>(response);
};

export const getOrder = async (id: string): Promise<Order> => {
  const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
    headers: createHeaders(),
  });
  
  return handleResponse<Order>(response);
};

export const createOrder = async (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'orderNumber'>): Promise<Order> => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: createHeaders(),
    body: JSON.stringify(order),
  });
  
  return handleResponse<Order>(response);
};

export const updateOrder = async (id: string, data: Partial<Order>): Promise<Order> => {
  const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
    method: 'PUT',
    headers: createHeaders(),
    body: JSON.stringify(data),
  });
  
  return handleResponse<Order>(response);
};

export const deleteOrder = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
    method: 'DELETE',
    headers: createHeaders(),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(errorData.message || `API error: ${response.status}`);
  }
};

// Get customer orders
export const getCustomerOrders = async (customerId: string): Promise<Order[]> => {
  const response = await fetch(`${API_BASE_URL}/orders/customer/${customerId}`, {
    headers: createHeaders(),
  });
  
  return handleResponse<Order[]>(response);
};
