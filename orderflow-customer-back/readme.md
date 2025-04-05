# OrderFlow 客户管理系统 - 后端服务

## 项目简介

这是 OrderFlow 客户管理系统的后端服务，基于 Express.js 构建，提供完整的 RESTful API 服务。本项目采用模块化设计，实现了用户认证、客户管理、订单管理等核心功能。

## 技术栈

- Node.js (v18+)
- Express.js
- MongoDB
- Mongoose
- JWT 认证
- Bcrypt 加密
- Express Validator
- Winston 日志
- Jest 测试框架

## 目录结构

```
src/
├── config/              # 配置文件
│   ├── db.js           # 数据库配置
│   ├── environment.js  # 环境变量配置
│   └── express.js      # Express 配置
├── controllers/        # 控制器层
│   ├── authController.js
│   ├── customerController.js
│   ├── orderController.js
│   └── userController.js
├── models/            # 数据模型层
│   ├── Customer.js
│   ├── Order.js
│   └── User.js
├── routes/            # 路由层
│   ├── auth.js
│   ├── customers.js
│   ├── orders.js
│   └── users.js
├── middleware/        # 中间件
│   ├── auth.js        # 认证中间件
│   ├── error.js       # 错误处理
│   └── validate.js    # 请求验证
├── services/         # 业务逻辑层
│   ├── authService.js
│   ├── customerService.js
│   └── orderService.js
├── utils/           # 工具函数
│   ├── logger.js
│   └── response.js
└── index.js        # 应用入口文件

scripts/            # 数据库脚本
└── init-db.js     # 数据库初始化脚本

test/              # 测试文件
├── auth.test.js
├── customer.test.js
└── order.test.js
```

## 开发环境设置

1. 安装依赖：
```bash
pnpm install
```

2. 环境变量配置：
```bash
# .env 文件配置
PORT=5000
MONGODB_URI=mongodb://localhost:27017/orderflow
JWT_SECRET=your-secret-key
NODE_ENV=development
```

3. 启动开发服务器：
```bash
pnpm dev
```

## API 文档

### 认证接口
- POST /api/auth/login - 用户登录
- POST /api/auth/register - 用户注册
- GET /api/auth/me - 获取当前用户信息

### 客户接口
- GET /api/customers - 获取客户列表
- GET /api/customers/:id - 获取客户详情
- POST /api/customers - 创建客户
- PUT /api/customers/:id - 更新客户
- DELETE /api/customers/:id - 删除客户

### 订单接口
- GET /api/orders - 获取订单列表
- GET /api/orders/:id - 获取订单详情
- POST /api/orders - 创建订单
- PUT /api/orders/:id - 更新订单
- DELETE /api/orders/:id - 删除订单

## 测试

运行测试：
```bash
pnpm test
```

## 部署

1. 构建生产版本：
```bash
pnpm build
```

2. 启动生产服务：
```bash
pnpm start
```

## 开发规范

- 使用 ESLint 进行代码检查
- 使用 Prettier 进行代码格式化
- 遵循 RESTful API 设计规范
- 编写单元测试和集成测试
- 使用中文注释