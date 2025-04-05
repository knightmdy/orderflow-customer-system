// 切换到 orderflow 数据库
db = db.getSiblingDB('orderflow');

// 创建集合
db.createCollection('users');
db.createCollection('customers');
db.createCollection('orders');

// 创建索引
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "username": 1 }, { unique: true });

db.customers.createIndex({ "email": 1 });
db.customers.createIndex({ "phone": 1 });
db.customers.createIndex({ "name": 1 });

db.orders.createIndex({ "orderNumber": 1 }, { unique: true });
db.orders.createIndex({ "customerId": 1 });
db.orders.createIndex({ "customerName": 1 });
db.orders.createIndex({ "status": 1 });
db.orders.createIndex({ "orderDate": 1 });
db.orders.createIndex({ "createdAt": 1 });

// 创建管理员用户（密码：admin123）
db.users.insertOne({
  username: "admin",
  email: "admin@example.com",
  password: "$2a$10$4yV9ASf9WJ5BAomOGhMLSuB2fRyU2n/tEF9pe4Y6R5QXoXO/..SIO", // 这里需要使用 bcrypt 加密后的密码
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
});

// 创建普通用户（密码：user123）
db.users.insertMany([
  {
    username: "user1",
    email: "user1@example.com",
    password: "$2a$10$4yV9ASf9WJ5BAomOGhMLSuB2fRyU2n/tEF9pe4Y6R5QXoXO/..SIO",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    username: "user2",
    email: "user2@example.com",
    password: "$2a$10$4yV9ASf9WJ5BAomOGhMLSuB2fRyU2n/tEF9pe4Y6R5QXoXO/..SIO",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// 创建测试数据
// 1. 创建测试客户
const customers = [
  {
    name: "张三",
    email: "zhangsan@example.com",
    phone: "13800138001",
    address: "北京市朝阳区",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "李四",
    email: "lisi@example.com",
    phone: "13800138002",
    address: "上海市浦东新区",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "王五",
    email: "wangwu@example.com",
    phone: "13800138003",
    address: "广州市天河区",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "赵六",
    email: "zhaoliu@example.com",
    phone: "13800138004",
    address: "深圳市南山区",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "钱七",
    email: "qianqi@example.com",
    phone: "13800138005",
    address: "杭州市西湖区",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const customerIds = db.customers.insertMany(customers).insertedIds;

// 2. 创建测试订单
const orders = [
  {
    orderNumber: "ORD202404050001",
    customerId: customerIds[0],
    customerName: "张三",
    items: [
      {
        productId: ObjectId(),
        name: "商品A",
        price: 100,
        quantity: 2
      },
      {
        productId: ObjectId(),
        name: "商品B",
        price: 150,
        quantity: 1
      }
    ],
    total: 350,
    status: "completed",
    orderDate: new Date("2024-04-01"),
    createdAt: new Date("2024-04-01"),
    updatedAt: new Date("2024-04-01")
  },
  {
    orderNumber: "ORD202404050002",
    customerId: customerIds[1],
    customerName: "李四",
    items: [
      {
        productId: ObjectId(),
        name: "商品C",
        price: 200,
        quantity: 1
      }
    ],
    total: 200,
    status: "pending",
    orderDate: new Date("2024-04-02"),
    createdAt: new Date("2024-04-02"),
    updatedAt: new Date("2024-04-02")
  },
  {
    orderNumber: "ORD202404050003",
    customerId: customerIds[2],
    customerName: "王五",
    items: [
      {
        productId: ObjectId(),
        name: "商品D",
        price: 300,
        quantity: 2
      }
    ],
    total: 600,
    status: "processing",
    orderDate: new Date("2024-04-03"),
    createdAt: new Date("2024-04-03"),
    updatedAt: new Date("2024-04-03")
  },
  {
    orderNumber: "ORD202404050004",
    customerId: customerIds[3],
    customerName: "赵六",
    items: [
      {
        productId: ObjectId(),
        name: "商品E",
        price: 250,
        quantity: 1
      },
      {
        productId: ObjectId(),
        name: "商品F",
        price: 180,
        quantity: 2
      }
    ],
    total: 610,
    status: "shipped",
    orderDate: new Date("2024-04-04"),
    createdAt: new Date("2024-04-04"),
    updatedAt: new Date("2024-04-04")
  },
  {
    orderNumber: "ORD202404050005",
    customerId: customerIds[4],
    customerName: "钱七",
    items: [
      {
        productId: ObjectId(),
        name: "商品G",
        price: 400,
        quantity: 1
      }
    ],
    total: 400,
    status: "delivered",
    orderDate: new Date("2024-04-05"),
    createdAt: new Date("2024-04-05"),
    updatedAt: new Date("2024-04-05")
  }
];

db.orders.insertMany(orders);

print("数据库初始化完成！"); 