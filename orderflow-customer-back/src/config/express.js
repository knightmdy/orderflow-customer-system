import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import config from './environment';
import errorMiddleware from '../middleware/errorMiddleware';

const app = express();

// 基础中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));

// 路由
import userRoutes from '../routes/userRoutes';
import productRoutes from '../routes/productRoutes';
import orderRoutes from '../routes/orderRoutes';

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// 错误处理
app.use(errorMiddleware);

export default app;
