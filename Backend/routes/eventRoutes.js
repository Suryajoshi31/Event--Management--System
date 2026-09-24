const express = require('express')
const router = express.Router()
const {
  getEvents,
  getEventById,
  createEvent,
} = require('../controllers/eventController')
const { protect, authorize } = require('../middleware/authMiddleware')

router.get('/', getEvents)
router.get('/:id', getEventById)
router.post('/', protect, authorize('organizer', 'admin'), createEvent)

module.exports = router
