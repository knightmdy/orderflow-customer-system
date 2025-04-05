import { createOrder, getOrders, getOrder, updateOrderStatus } from '../services/orderService';

// 创建订单
export const create = async (req, res) => {
  try {
    const order = await createOrder(req.body, req.user._id);
    res.status(201).json({
      status: 'success',
      data: order
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// 获取订单列表
export const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const result = await getOrders(req.user._id, req.user.role, page, limit);
    
    res.status(200).json({
      status: 'success',
      results: result.orders.length,
      total: result.total,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
      data: result.orders
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// 获取订单详情
export const getOne = async (req, res) => {
  try {
    const order = await getOrder(req.params.id, req.user._id, req.user.role);
    res.status(200).json({
      status: 'success',
      data: order
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// 更新订单状态
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await updateOrderStatus(req.params.id, status);
    res.status(200).json({
      status: 'success',
      data: order
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};