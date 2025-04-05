# OrderFlow 客户管理系统

## 项目概述

OrderFlow 是一个现代化的客户管理系统，采用前后端分离架构，提供完整的客户信息和订单管理功能。系统使用最新的技术栈构建，具有良好的可扩展性和用户体验。

## 核心功能

### 用户管理 👥
- 多角色权限控制（管理员/普通用户）
- 安全的用户认证与授权
- 个人信息管理

### 客户管理 🏢
- 客户信息的 CRUD 操作
- 客户分类管理
- 客户搜索与筛选
- 客户历史订单查看

### 订单管理 📦
- 订单全生命周期管理
- 多状态流转（待处理/处理中/已发货/已完成）
- 订单详情查看
- 订单搜索与高级筛选

### 数据分析 📊
- 实时销售数据统计
- 客户增长趋势分析
- 订单状态分布
- 销售业绩报表

## 技术架构

### 前端技术栈
- ⚛️ React 18 - 用户界面构建
- 📘 TypeScript - 类型安全
- ⚡ Vite - 开发构建工具
- 🔄 TanStack Query - 数据请求管理
- 🎨 Tailwind CSS - 样式解决方案
- 🎯 Shadcn UI - UI 组件库
- 🛣️ React Router - 路由管理
- 📡 Axios - HTTP 客户端

### 后端技术栈
- 🟢 Node.js - 运行环境
- 🚂 Express.js - Web 框架
- 🍃 MongoDB - 数据库
- 🔑 JWT - 身份认证
- 🔒 Bcrypt - 密码加密

## 快速开始

### 环境要求
- Node.js >= 18
- MongoDB >= 6.0
- pnpm >= 8.0

### 1. 克隆项目
```bash
git clone [项目地址]
cd orderflow-customer-system
```

### 2. 后端服务启动
```bash
cd orderflow-customer-back
pnpm install
pnpm dev
```

### 3. 前端服务启动
```bash
cd orderflow-customer-front
pnpm install
pnpm dev
```

### 4. 访问系统
- 前端页面：http://localhost:5173
- 后端接口：http://localhost:5000

## 测试账号

### 管理员账号
- 账号：admin
- 密码：admin123

### 测试用户账号
- 账号：user1
- 密码：user123

## 开发指南

### 代码规范
- 遵循 ESLint 配置
- 使用 Prettier 格式化代码
- 遵循 TypeScript 严格模式
- 使用中文注释

### Git 工作流
1. 创建功能分支
2. 提交代码
3. 代码审查
4. 合并主分支

## 部署说明

### 前端部署
```bash
cd orderflow-customer-front
pnpm build
```

### 后端部署
```bash
cd orderflow-customer-back
pnpm build
pnpm start
```

## 项目进度

### 已完成 ✅
- 基础架构搭建
- 用户认证系统
- 基础 API 开发
- 前端框架集成
- 响应式布局

### 进行中 🚧
- 数据统计功能
- 订单管理优化
- 客户分析报表
- 性能优化

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交代码
4. 发起 Pull Request

## 许可证

本项目采用 MIT 许可证

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

## 联系方式

如有任何问题或建议，请提交 Issue 或联系项目维护者。 
