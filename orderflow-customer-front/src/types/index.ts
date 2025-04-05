
// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// Customer types
export interface Customer {
  id: string;
  userId: string; // ID of the user who created/owns this customer
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Product types for order items
export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// Order types
export interface Order {
  id: string;
  userId: string; // ID of the user who created/owns this order
  orderNumber: string;
  customerId: string;
  customerName: string;
  orderDate: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  items: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  createdAt: string;
  updatedAt: string;
}

// Dashboard stats
export interface DashboardStats {
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
  pendingOrders: number;
}
