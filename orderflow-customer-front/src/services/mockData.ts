
// If this is not the exact file structure, we'll need to create this file or update the correct file.
// This is a simplified version just to ensure our changes work properly:

import { Customer, Order } from '@/types';

// Let's create mock data with some customers and orders for admin and some for regular users

// Mock customers with user IDs
export const mockCustomers: Customer[] = [
  {
    id: '1',
    userId: '1', // Admin's customer
    name: 'Acme Corporation',
    email: 'contact@acme.com',
    phone: '555-123-4567',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA'
    },
    createdAt: '2023-01-15T08:00:00.000Z',
    updatedAt: '2023-01-15T08:00:00.000Z'
  },
  {
    id: '2',
    userId: '1', // Admin's customer
    name: 'Globex Industries',
    email: 'info@globex.com',
    phone: '555-987-6543',
    address: {
      street: '456 Tech Blvd',
      city: 'San Francisco',
      state: 'CA',
      zip: '94107',
      country: 'USA'
    },
    createdAt: '2023-02-20T10:30:00.000Z',
    updatedAt: '2023-03-15T14:15:00.000Z'
  },
  {
    id: '3',
    userId: '2', // Regular user's customer
    name: 'Local Cafe',
    email: 'hello@localcafe.com',
    phone: '555-246-8101',
    address: {
      street: '789 Coffee Lane',
      city: 'Portland',
      state: 'OR',
      zip: '97201',
      country: 'USA'
    },
    createdAt: '2023-03-05T11:45:00.000Z',
    updatedAt: '2023-04-10T09:20:00.000Z'
  },
  {
    id: '4',
    userId: '2', // Regular user's customer
    name: 'City Bookstore',
    email: 'books@citybookstore.com',
    phone: '555-369-2468',
    address: {
      street: '321 Reading Ave',
      city: 'Boston',
      state: 'MA',
      zip: '02108',
      country: 'USA'
    },
    createdAt: '2023-04-22T13:10:00.000Z',
    updatedAt: '2023-04-22T13:10:00.000Z'
  }
];

// Mock orders with user IDs
export const mockOrders: Order[] = [
  {
    id: '101',
    userId: '1', // Admin's order
    orderNumber: 'ORD-2023-001',
    customerId: '1',
    customerName: 'Acme Corporation',
    orderDate: '2023-06-10T14:30:00.000Z',
    status: 'completed',
    items: [
      {
        productId: 'p1',
        name: 'Enterprise Software License',
        quantity: 5,
        price: 999.99
      },
      {
        productId: 'p2',
        name: 'Technical Support Plan',
        quantity: 1,
        price: 1299.99
      }
    ],
    total: 6299.94,
    createdAt: '2023-06-10T14:30:00.000Z',
    updatedAt: '2023-06-15T09:45:00.000Z'
  },
  {
    id: '102',
    userId: '1', // Admin's order
    orderNumber: 'ORD-2023-002',
    customerId: '2',
    customerName: 'Globex Industries',
    orderDate: '2023-07-05T11:15:00.000Z',
    status: 'processing',
    items: [
      {
        productId: 'p3',
        name: 'Data Migration Service',
        quantity: 1,
        price: 2499.99
      }
    ],
    total: 2499.99,
    createdAt: '2023-07-05T11:15:00.000Z',
    updatedAt: '2023-07-06T08:20:00.000Z'
  },
  {
    id: '103',
    userId: '2', // Regular user's order
    orderNumber: 'ORD-2023-003',
    customerId: '3',
    customerName: 'Local Cafe',
    orderDate: '2023-07-08T15:45:00.000Z',
    status: 'pending',
    items: [
      {
        productId: 'p4',
        name: 'POS System',
        quantity: 2,
        price: 1200.00
      },
      {
        productId: 'p5',
        name: 'Inventory Management Add-on',
        quantity: 1,
        price: 399.99
      }
    ],
    total: 2799.99,
    createdAt: '2023-07-08T15:45:00.000Z',
    updatedAt: '2023-07-08T15:45:00.000Z'
  },
  {
    id: '104',
    userId: '2', // Regular user's order
    orderNumber: 'ORD-2023-004',
    customerId: '4',
    customerName: 'City Bookstore',
    orderDate: '2023-07-12T10:30:00.000Z',
    status: 'completed',
    items: [
      {
        productId: 'p6',
        name: 'E-commerce Integration',
        quantity: 1,
        price: 1500.00
      }
    ],
    total: 1500.00,
    createdAt: '2023-07-12T10:30:00.000Z',
    updatedAt: '2023-07-18T13:25:00.000Z'
  }
];
