const User = require('../models/User');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: 'Email ya registrado' });
  const user = await User.create({ name, email, password });
  res.status(201).json({ id: user._id, name: user.name, email: user.email });
};


exports.me = async (req, res) => {
  const u = await User.findById(req.userId).select('name email');
  if (!u) return res.status(404).json({ message: 'No encontrado' });
  res.json({ id: u._id, name: u.name, email: u.email });
};