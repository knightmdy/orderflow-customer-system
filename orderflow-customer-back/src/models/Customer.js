import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '请输入客户姓名'],
    trim: true
  },
  email: {
    type: String,
    required: [true, '请输入客户邮箱'],
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, '请输入客户电话']
  },
  address: {
    type: String,
    required: [true, '请输入客户地址']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Customer = mongoose.model('Customer', customerSchema);
export default Customer; 