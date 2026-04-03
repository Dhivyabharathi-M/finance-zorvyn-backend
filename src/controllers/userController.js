const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { validateUser } = require('../utils/validators');

const register = (req, res) => {
  const errors = validateUser(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const { name, email, password } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: 'Error hashing password' });

    User.create({ name, email, password: hashedPassword }, (err, user) => {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'Email already exists' });
        }
        return res.status(500).json({ error: 'Error creating user' });
      }
      res.status(201).json({ message: 'User registered successfully', user: { id: user.id, name, email, role: user.role } });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  User.findByEmail(email, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' });
      res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    });
  });
};

const getUsers = (req, res) => {
  User.getAll((err, users) => {
    if (err) return res.status(500).json({ error: 'Error fetching users' });
    res.json(users);
  });
};

const updateUserRole = (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  if (!['viewer', 'analyst', 'admin'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  User.updateRole(id, role, (err) => {
    if (err) return res.status(500).json({ error: 'Error updating role' });
    res.json({ message: 'Role updated successfully' });
  });
};

const updateUserStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!['active', 'inactive'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  User.updateStatus(id, status, (err) => {
    if (err) return res.status(500).json({ error: 'Error updating status' });
    res.json({ message: 'Status updated successfully' });
  });
};

module.exports = { register, login, getUsers, updateUserRole, updateUserStatus };