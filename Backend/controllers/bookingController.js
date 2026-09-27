const Booking = require('../models/Booking')
const Event = require('../models/Event')

// @desc    Create a new event booking
// @route   POST /api/bookings
// @access  Private (Authenticated Users)
const createBooking = async (req, res) => {
  try {
    const {
      eventId,
      eventTitle,
      eventDate,
      eventTime,
      eventLocation,
      eventImage,
      seats,
      unitPrice,
    } = req.body

    if (!eventId || !eventTitle || !seats) {
      return res.status(400).json({ message: 'Missing required booking details' })
    }

    const ticketId = 'TKT-' + Math.floor(1000 + Math.random() * 9000)
    const totalPrice = (unitPrice || 0) * seats

    const booking = new Booking({
      ticketId,
      user: req.user._id,
      eventId: String(eventId),
      eventTitle,
      eventDate: eventDate || 'TBD',
      eventTime: eventTime || '7:00 PM',
      eventLocation: eventLocation || 'TBD',
      eventImage: eventImage || '',
      userName: req.user.name,
      userEmail: req.user.email,
      seats: Number(seats),
      unitPrice: Number(unitPrice || 0),
      totalPrice: Number(totalPrice),
      status: 'Pending',
    })

    const createdBooking = await booking.save()

    res.status(201).json(createdBooking)
  } catch (error) {
    console.error('Create Booking Error:', error)
    res.status(500).json({ message: error.message || 'Failed to create booking' })
  }
}

// @desc    Get logged in user's bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json(bookings)
  } catch (error) {
    console.error('Get My Bookings Error:', error)
    res.status(500).json({ message: error.message || 'Failed to fetch bookings' })
  }
}

// @desc    Cancel a booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' })
    }

    // Ensure user owns the booking or is admin
    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' })
    }

    booking.status = 'Cancelled'
    const updatedBooking = await booking.save()

    res.json(updatedBooking)
  } catch (error) {
    console.error('Cancel Booking Error:', error)
    res.status(500).json({ message: error.message || 'Failed to cancel booking' })
  }
}

// @desc    Update booking status (Approved / Rejected)
// @route   PUT /api/bookings/:id/status
// @access  Private (Admin / Organizer)
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body
    if (!['Approved', 'Rejected', 'Pending', 'Cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid booking status' })
    }

    // Search by _id or by ticketId
    let booking = await Booking.findById(req.params.id)
    if (!booking) {
      booking = await Booking.findOne({ ticketId: req.params.id })
    }

    if (!booking) {
      return res.status(404).json({ message: 'Booking ticket not found' })
    }

    booking.status = status
    const updatedBooking = await booking.save()

    res.json(updatedBooking)
  } catch (error) {
    console.error('Update Booking Status Error:', error)
    res.status(500).json({ message: error.message || 'Failed to update booking status' })
  }
}

// @desc    Get all bookings (Admin/Organizer)
// @route   GET /api/bookings
// @access  Private (Admin/Organizer)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user', 'name email').sort({ createdAt: -1 })
    res.json(bookings)
  } catch (error) {
    console.error('Get All Bookings Error:', error)
    res.status(500).json({ message: error.message || 'Failed to fetch all bookings' })
  }
}

module.exports = {
  createBooking,
  getMyBookings,
  cancelBooking,
  updateBookingStatus,
  getAllBookings,
}
