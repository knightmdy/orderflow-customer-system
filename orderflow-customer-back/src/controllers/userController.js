import { registerUser, loginUser, getCurrentUser } from '../services/userService';

export const register = async (req, res) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.json(result);
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await getCurrentUser(req.user._id);
    res.json(user);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: '服务器错误'
    });
  }
};
