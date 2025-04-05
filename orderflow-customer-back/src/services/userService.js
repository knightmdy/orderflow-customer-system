import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (userData) => {
  const { name, email, password, role } = userData;
  
  // 检查邮箱是否已存在
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('该邮箱已被注册');
  }

  // 创建新用户
  const user = await User.create({
    name,
    email,
    password,
    role: role || 'user'
  });

  // 生成 JWT token
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new Error('用户不存在');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error('密码错误');
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
};

export const getCurrentUser = async (userId) => {
  return await User.findById(userId).select('-password');
}; 