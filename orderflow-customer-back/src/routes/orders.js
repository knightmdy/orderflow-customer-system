import express from 'express';
import { body, validationResult } from 'express-validator';
import Order from '../models/Order.js';
import Customer from '../models/Customer.js';
import { auth, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all orders
router.get('/', auth, async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { userId: req.user._id };
    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single order
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user has permission to access this order
    if (req.user.role !== 'admin' && order.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create order
router.post('/', [
  auth,
  body('customerId').notEmpty().withMessage('Customer ID is required'),
  body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
  body('items.*.productId').notEmpty().withMessage('Product ID is required'),
  body('items.*.name').notEmpty().withMessage('Product name is required'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('items.*.price').isFloat({ min: 0 }).withMessage('Price must be non-negative'),
  body('total').isFloat({ min: 0 }).withMessage('Total must be non-negative')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if customer exists and user has permission to access it
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    if (req.user.role !== 'admin' && customer.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const order = new Order({
      ...req.body,
      userId: req.user._id,
      customerName: customer.name
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order
router.put('/:id', [
  auth,
  body('status').optional().isIn(['pending', 'processing', 'completed', 'cancelled']).withMessage('Invalid status'),
  body('items').optional().isArray({ min: 1 }).withMessage('At least one item is required'),
  body('items.*.productId').optional().notEmpty().withMessage('Product ID is required'),
  body('items.*.name').optional().notEmpty().withMessage('Product name is required'),
  body('items.*.quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('items.*.price').optional().isFloat({ min: 0 }).withMessage('Price must be non-negative'),
  body('total').optional().isFloat({ min: 0 }).withMessage('Total must be non-negative')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user has permission to update this order
    if (req.user.role !== 'admin' && order.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // If customerId is being updated, verify the new customer exists and user has permission
    if (req.body.customerId && req.body.customerId !== order.customerId.toString()) {
      const customer = await Customer.findById(req.body.customerId);
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      if (req.user.role !== 'admin' && customer.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Access denied' });
      }
      req.body.customerName = customer.name;
    }

    Object.assign(order, req.body);
    await order.save();
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete order
router.delete('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user has permission to delete this order
    if (req.user.role !== 'admin' && order.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await order.remove();
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get customer orders
router.get('/customer/:customerId', auth, async (req, res) => {
  try {
    // First check if the user has permission to view this customer
    const customer = await Customer.findById(req.params.customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    if (req.user.role !== 'admin' && customer.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const orders = await Order.find({ customerId: req.params.customerId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 