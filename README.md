# OrderFlow 客户管理系统

OrderFlow 是一个现代化的客户管理系统，提供完整的客户和订单管理功能。系统采用前后端分离架构，使用最新的技术栈构建。

## 技术栈

### 前端
- React 18
- TypeScript
- Vite
- TanStack Query (React Query)
- Tailwind CSS
- Shadcn UI
- React Router
- Axios

### 后端
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT 认证
- Bcrypt

## 功能特性

- 🔐 用户认证与授权
  - 管理员和普通用户角色
  - JWT 令牌认证
  - 密码加密存储
- 📊 数据统计仪表盘
  - 订单统计
  - 客户统计
  - 销售趋势分析
- 👥 客户管理
  - 客户列表查看
  - 客户详情查看
  - 客户搜索
  - 客户添加/编辑/删除
- 📦 订单管理
  - 订单列表查看
  - 订单详情查看
  - 订单搜索和筛选
  - 订单添加/编辑/删除
  - 订单状态管理（待处理、处理中、已发货、已完成）
- 📱 响应式设计
- 🌐 中文本地化

## 项目结构

```
orderflow-customer-system/
├── orderflow-customer-front/    # 前端项目
│   ├── src/
│   │   ├── components/         # 通用组件
│   │   │   ├── layout/        # 布局组件
│   │   │   └── ui/            # UI 组件
│   │   ├── contexts/          # React Context
│   │   ├── hooks/             # 自定义 Hooks
│   │   ├── pages/             # 页面组件
│   │   │   ├── auth/          # 认证相关页面
│   │   │   ├── customers/     # 客户相关页面
│   │   │   ├── orders/        # 订单相关页面
│   │   │   └── dashboard/     # 仪表盘页面
│   │   ├── services/          # API 服务
│   │   └── utils/             # 工具函数
│   └── ...
│
└── orderflow-customer-back/     # 后端项目
    ├── src/
    │   ├── config/            # 配置文件
    │   ├── controllers/       # 控制器
    │   ├── middleware/        # 中间件
    │   ├── models/            # 数据模型
    │   ├── routes/            # 路由
    │   ├── services/          # 业务逻辑
    │   └── utils/             # 工具函数
    ├── scripts/               # 数据库脚本
    └── test/                  # 测试文件
```

## 快速开始

### 环境要求

- Node.js 18+
- MongoDB 6+
- pnpm (推荐) 或 npm

### 后端设置

1. 进入后端目录：
```bash
cd orderflow-customer-back
```

2. 安装依赖：
```bash
pnpm install
```

3. 配置环境变量：
```bash
# .env 文件已配置，包含以下内容：
PORT=5000
MONGODB_URI=mongodb://localhost:27017/orderflow
JWT_SECRET=orderflow-secret-key-2024
NODE_ENV=development
```

4. 初始化数据库：
```bash
# 确保 MongoDB 服务已启动
mongosh mongodb://localhost:27017/orderflow scripts/init-db.js
```

5. 启动开发服务器：
```bash
pnpm dev
```

### 前端设置

1. 进入前端目录：
```bash
cd orderflow-customer-front
```

2. 安装依赖：
```bash
pnpm install
```

3. 配置环境变量：
```bash
# .env 文件已配置，包含以下内容：
VITE_API_URL=http://localhost:5000
```

4. 启动开发服务器：
```bash
pnpm dev
```

## 测试账号

系统已预置以下测试账号：

### 管理员账号
- 用户名：admin
- 密码：admin123
- 邮箱：admin@example.com

### 普通用户账号
- 用户名：user1
- 密码：user123
- 邮箱：user1@example.com

- 用户名：user2
- 密码：user123
- 邮箱：user2@example.com

## 开发进度

### 已完成功能
- [x] 项目基础架构搭建
- [x] 用户认证系统
- [x] 数据库模型设计
- [x] 基础 API 接口
- [x] 前端 UI 组件库集成
- [x] 响应式布局
- [x] 测试数据生成

### 进行中功能
- [ ] 订单状态管理
- [ ] 数据统计图表
- [ ] 客户管理界面
- [ ] 订单管理界面

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 访问应用

- 前端应用：http://localhost:5173
- 后端 API：http://localhost:5000/api

### 默认管理员账户

- 用户名：admin
- 密码：admin123

## API 文档

### 认证相关

- POST /api/auth/login - 用户登录
- POST /api/auth/register - 用户注册
- GET /api/auth/me - 获取当前用户信息

### 客户相关

- GET /api/customers - 获取客户列表
- GET /api/customers/:id - 获取客户详情
- POST /api/customers - 创建新客户
- PUT /api/customers/:id - 更新客户信息
- DELETE /api/customers/:id - 删除客户

### 订单相关

- GET /api/orders - 获取订单列表
- GET /api/orders/:id - 获取订单详情
- POST /api/orders - 创建新订单
- PUT /api/orders/:id - 更新订单信息
- DELETE /api/orders/:id - 删除订单

### 仪表盘相关

- GET /api/dashboard/stats - 获取仪表盘统计数据
- GET /api/dashboard/recent-orders - 获取最近订单

## 开发指南

### 代码规范

- 使用 ESLint 进行代码检查
- 使用 Prettier 进行代码格式化
- 遵循 TypeScript 类型定义
- 使用中文注释和文档

### Git 工作流

1. 创建功能分支
2. 开发功能
3. 提交代码
4. 创建 Pull Request
5. 代码审查
6. 合并到主分支

## 部署

### 后端部署

1. 构建生产环境：
```bash
pnpm run build
```

2. 启动生产服务器：
```bash
pnpm start
```

### 前端部署

1. 构建生产环境：
```bash
pnpm run build
```

2. 预览构建结果：
```bash
pnpm run preview
```

## 联系方式

如有任何问题或建议，请提交 Issue 或联系项目维护者。 
