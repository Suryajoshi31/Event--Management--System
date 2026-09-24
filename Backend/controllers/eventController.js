const Event = require('../models/Event')

// Sample events to seed database if empty
const sampleEvents = [
  {
    title: 'Neon Pulse Synthwave Concert',
    date: 'SAT, OCT 14',
    time: '8:00 PM',
    location: 'Skyline Amphitheater, Downtown',
    price: 45,
    category: 'Music',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    organizer: 'CyberBeats Production',
    description: 'Immerse yourself in retro-futuristic synthwave beats, laser shows, and unmatched energy.',
    availableSeats: 150,
  },
  {
    title: 'Global Tech & AI Summit 2026',
    date: 'WED, NOV 02',
    time: '9:00 AM',
    location: 'Convention Center, Metro City',
    price: 120,
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    organizer: 'TechForward Global',
    description: 'Join top engineers, founders, and researchers exploring machine learning and web3 trends.',
    availableSeats: 300,
  },
  {
    title: 'Artisan Food & Craft Beer Festival',
    date: 'SUN, NOV 12',
    time: '12:00 PM',
    location: 'Waterfront Park',
    price: 25,
    category: 'Food & Drink',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    organizer: 'Flavor Collective',
    description: 'Taste gourmet street foods, craft beers, and local wines with live acoustic music.',
    availableSeats: 200,
  },
  {
    title: 'Indie Rock Underground Night',
    date: 'FRI, DEC 01',
    time: '9:30 PM',
    location: 'The Velvet Lounge',
    price: 30,
    category: 'Music',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    organizer: 'Velvet Live',
    description: 'Featuring local breakout indie rock bands performing raw, high-energy live sets.',
    availableSeats: 80,
  },
]

// @desc    Get all events (or seed if empty)
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res) => {
  try {
    let events = await Event.find()
    if (events.length === 0) {
      events = await Event.insertMany(sampleEvents)
    }
    res.json(events)
  } catch (error) {
    console.error('Get Events Error:', error)
    res.status(500).json({ message: error.message || 'Failed to fetch events' })
  }
}

// @desc    Get single event by ID
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    if (event) {
      res.json(event)
    } else {
      res.status(404).json({ message: 'Event not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Create new event
// @route   POST /api/events
// @access  Private (Organizer / Admin)
const createEvent = async (req, res) => {
  try {
    const { title, date, time, location, price, category, image, description, availableSeats } = req.body

    const event = new Event({
      title,
      date,
      time: time || '7:00 PM',
      location,
      price: price || 0,
      category: category || 'Music',
      image: image || '',
      organizer: req.user.name,
      organizerId: req.user._id,
      description: description || '',
      availableSeats: availableSeats || 100,
    })

    const createdEvent = await event.save()
    res.status(201).json(createdEvent)
  } catch (error) {
    console.error('Create Event Error:', error)
    res.status(500).json({ message: error.message || 'Failed to create event' })
  }
}

module.exports = {
  getEvents,
  getEventById,
  createEvent,
}
