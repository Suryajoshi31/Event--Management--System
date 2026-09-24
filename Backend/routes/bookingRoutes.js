const express = require('express')
const router = express.Router()
const {
  createBooking,
  getMyBookings,
  cancelBooking,
  getAllBookings,
} = require('../controllers/bookingController')
const { protect, authorize } = require('../middleware/authMiddleware')

router.post('/', protect, createBooking)
router.get('/my-bookings', protect, getMyBookings)
router.put('/:id/cancel', protect, cancelBooking)
router.get('/', protect, authorize('admin', 'organizer'), getAllBookings)

module.exports = router
