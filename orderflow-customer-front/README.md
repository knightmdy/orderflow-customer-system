# OrderFlow 客户管理系统

## 项目简介

OrderFlow是一个完整的客户管理系统，包含前端和后端两个部分。前端使用React + TypeScript + Vite构建，后端使用Express.js + MongoDB构建。

## 技术栈

### 前端技术栈
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- React Query
- Zod (表单验证)
- 其他UI组件库：
  - Radix UI
  - Recharts (图表)
  - React Day Picker (日期选择)
  - Sonner (Toast通知)

### 后端技术栈
- Express.js
- MongoDB
- JWT认证
- bcryptjs (密码加密)
- express-validator (请求验证)
- morgan (日志记录)

## 项目结构

### 前端目录结构
```
orderflow-customer-front/
├── src/                # 源代码目录
├── public/            # 静态资源
├── node_modules/      # 依赖包
├── vite.config.ts     # Vite配置
├── tsconfig.json      # TypeScript配置
├── tailwind.config.ts # Tailwind配置
└── package.json       # 项目配置
```

### 后端目录结构
```
orderflow-customer-back/
├── src/               # 源代码目录
├── test/              # 测试文件
├── public/            # 静态资源
├── node_modules/      # 依赖包
└── package.json       # 项目配置
```

## 环境要求

- Node.js (建议使用最新LTS版本)
- MongoDB
- pnpm (包管理器)

## 安装和运行

### 前端
```bash
# 进入前端目录
cd orderflow-customer-front

# 安装依赖
pnpm install

# 开发环境运行
pnpm dev

# 生产环境构建
pnpm build
```

### 后端
```bash
# 进入后端目录
cd orderflow-customer-back

# 安装依赖
pnpm install

# 开发环境运行
pnpm dev

# 生产环境运行
pnpm start
```

## 环境配置

### 前端环境变量
创建 `.env` 文件：
```
VITE_API_URL=http://localhost:5000
```

### 后端环境变量
创建 `.env` 文件：
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/orderflow
JWT_SECRET=your-super-secret-key-123
JWT_EXPIRES_IN=24h
```

## 开发指南

1. 确保MongoDB服务已启动
2. 先启动后端服务
3. 再启动前端服务
4. 访问 http://localhost:5173 查看前端页面

## 测试

### 前端测试
```bash
pnpm lint
```

### 后端测试
```bash
pnpm test
```

## 部署

### 前端部署
1. 运行 `pnpm build` 生成生产环境代码
2. 将 `dist` 目录部署到Web服务器

### 后端部署
1. 确保环境变量正确配置
2. 运行 `pnpm start` 启动生产环境服务
3. 建议使用PM2等进程管理工具

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT License
