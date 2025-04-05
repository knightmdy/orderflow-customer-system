import Order from '../models/Order';

export const createOrder = async (orderData, userId) => {
  const order = await Order.create({
    ...orderData,
    customer: userId
  });
  return order;
};

export const getOrders = async (userId, role, page = 1, limit = 10) => {
  const query = {};
  if (role === 'user') {
    query.customer = userId;
  }

  const skip = (page - 1) * limit;
  const orders = await Order.find(query)
    .populate('customer', 'name email')
    .sort('-createdAt')
    .skip(skip)
    .limit(limit);

  const total = await Order.countDocuments(query);

  return {
    orders,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page
  };
};

export const getOrder = async (orderId, userId, role) => {
  const order = await Order.findById(orderId)
    .populate('customer', 'name email');

  if (!order) {
    throw new Error('未找到该订单');
  }

  if (role !== 'admin' && order.customer._id.toString() !== userId.toString()) {
    throw new Error('您没有权限查看此订单');
  }

  return order;
};

export const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true, runValidators: true }
  );

  if (!order) {
    throw new Error('未找到该订单');
  }

  return order;
}; 