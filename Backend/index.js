const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

// Load environment variables
dotenv.config()

// Connect to MongoDB
connectDB()

const app = express()

const mongoose = require('mongoose')

// Middleware
app.use(cors())
app.use(express.json())

// Database connection check middleware for API routes
app.use('/api', (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      message: 'Database connection error. Please ensure MongoDB service is running (net start MongoDB) or check your MONGO_URI.'
    })
  }
  next()
})

// API Routes
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/events', require('./routes/eventRoutes'))
app.use('/api/bookings', require('./routes/bookingRoutes'))

// Root Endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Event Management API is running' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: err.message || 'Server Error' })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
})
