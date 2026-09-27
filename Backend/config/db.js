const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/event_management', {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`)
    console.log('Please ensure MongoDB service is running locally (net start MongoDB) or specify a valid MONGO_URI in .env')
  }
}

module.exports = connectDB

