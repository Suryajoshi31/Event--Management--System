const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
    },
    date: {
      type: String,
      required: [true, 'Event date is required'],
    },
    time: {
      type: String,
      default: '7:00 PM',
    },
    location: {
      type: String,
      required: [true, 'Event location is required'],
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      default: 'Music',
    },
    image: {
      type: String,
      default: '',
    },
    organizer: {
      type: String,
      default: 'Event Management Team',
    },
    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    description: {
      type: String,
      default: '',
    },
    availableSeats: {
      type: Number,
      default: 100,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Event', eventSchema)
