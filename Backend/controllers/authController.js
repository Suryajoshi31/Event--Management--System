const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Helper function to generate JWT Token
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'event_management_super_secret_jwt_key_2026',
    {
      expiresIn: '30d',
    }
  )
}

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please enter all required fields' })
    }

    // Check if user already exists
    const userExists = await User.findOne({ email: email.toLowerCase() })

    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists' })
    }

    // Create new user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: role || 'user',
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      })
    } else {
      res.status(400).json({ message: 'Invalid user data' })
    }
  } catch (error) {
    console.error('Signup Error:', error)
    res.status(500).json({ message: error.message || 'Server error during signup' })
  }
}

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter email and password' })
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() })

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      })
    } else {
      res.status(401).json({ message: 'Invalid email or password' })
    }
  } catch (error) {
    console.error('Login Error:', error)
    res.status(500).json({ message: error.message || 'Server error during login' })
  }
}

// @desc    Get current logged in user profile
// @route   GET /api/auth/me
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
}
