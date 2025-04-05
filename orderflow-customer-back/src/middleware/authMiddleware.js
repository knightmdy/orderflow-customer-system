import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import config from '../config/environment';
import User from '../models/userModel';

export const protect = async (req, res, next) => {
  try {
    // 1) 获取token
    let token;
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: '您尚未登录,请先登录'
      });
    }

    // 2) 验证token
    const decoded = await promisify(jwt.verify)(token, config.jwtSecret);

    // 3) 检查用户是否仍然存在
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: '此token对应的用户不存在'
      });
    }

    // 4) 将用户信息附加到请求对象
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      status: 'error',
      message: '认证失败,请重新登录'
    });
  }
};

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: '您没有执行此操作的权限'
      });
    }
    next();
  };
};
