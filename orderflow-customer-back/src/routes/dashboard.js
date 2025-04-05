import express from 'express';
import Order from '../models/Order.js';
import Customer from '../models/Customer.js';
import { auth, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get dashboard statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { userId: req.user._id };
    
    const [
      totalOrders,
      totalCustomers,
      pendingOrders,
      completedOrders
    ] = await Promise.all([
      Order.countDocuments(query),
      Customer.countDocuments(query),
      Order.countDocuments({ ...query, status: 'pending' }),
      Order.countDocuments({ ...query, status: 'completed' })
    ]);

    res.json({
      totalOrders,
      totalCustomers,
      pendingOrders,
      completedOrders
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get recent orders
router.get('/recent-orders', auth, async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { userId: req.user._id };
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('customer', 'name email');

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get recent customers
router.get('/recent-customers', auth, async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { userId: req.user._id };
    const customers = await Customer.find(query)
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 