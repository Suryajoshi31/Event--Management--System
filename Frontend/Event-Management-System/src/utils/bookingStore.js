import { useState, useEffect } from 'react'

const BOOKINGS_STORAGE_KEY = 'event_management_bookings'

const initialSampleBookings = [
  {
    id: 'TKT-9821',
    eventId: 1,
    eventTitle: 'Neon Pulse Synthwave Concert',
    eventDate: 'SAT, OCT 14',
    eventTime: '8:00 PM',
    eventLocation: 'Skyline Amphitheater, Downtown',
    eventImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    userName: 'Alex Morgan',
    userEmail: 'alex.m@example.com',
    seats: 2,
    unitPrice: 45,
    totalPrice: 90,
    status: 'Pending',
    bookedAt: '2026-09-23T14:30:00.000Z'
  },
  {
    id: 'TKT-9822',
    eventId: 2,
    eventTitle: 'Global Tech & AI Summit 2026',
    eventDate: 'WED, OCT 18',
    eventTime: '9:30 AM',
    eventLocation: 'Metropolitan Convention Center',
    eventImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    userName: 'Sarah Jenkins',
    userEmail: 'sarah.j@example.com',
    seats: 1,
    unitPrice: 120,
    totalPrice: 120,
    status: 'Approved',
    bookedAt: '2026-09-22T10:15:00.000Z'
  },
  {
    id: 'TKT-9823',
    eventId: 6,
    eventTitle: 'Midnight Jazz & Soul Night',
    eventDate: 'SAT, NOV 11',
    eventTime: '10:00 PM',
    eventLocation: 'The Blue Note Lounge',
    eventImage: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80',
    userName: 'David Chen',
    userEmail: 'david.c@example.com',
    seats: 4,
    unitPrice: 35,
    totalPrice: 140,
    status: 'Pending',
    bookedAt: '2026-09-23T16:00:00.000Z'
  }
]

export const getBookings = () => {
  try {
    const data = localStorage.getItem(BOOKINGS_STORAGE_KEY)
    if (!data) {
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(initialSampleBookings))
      return initialSampleBookings
    }
    return JSON.parse(data)
  } catch (e) {
    console.error('Error reading bookings from localStorage:', e)
    return initialSampleBookings
  }
}

export const saveBookings = (bookings) => {
  try {
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings))
    window.dispatchEvent(new CustomEvent('bookings-changed'))
  } catch (e) {
    console.error('Error saving bookings to localStorage:', e)
  }
}

export const addBooking = (bookingData) => {
  const current = getBookings()
  const randomNum = Math.floor(1000 + Math.random() * 9000)
  const newBooking = {
    id: `TKT-${randomNum}`,
    status: 'Pending',
    bookedAt: new Date().toISOString(),
    ...bookingData
  }
  const updated = [newBooking, ...current]
  saveBookings(updated)
  return newBooking
}

export const updateBookingStatus = (bookingId, newStatus) => {
  const current = getBookings()
  const updated = current.map((b) =>
    b.id === bookingId ? { ...b, status: newStatus } : b
  )
  saveBookings(updated)
}

export const cancelBooking = (bookingId) => {
  const current = getBookings()
  const updated = current.filter((b) => b.id !== bookingId)
  saveBookings(updated)
}

export const useBookingsState = () => {
  const [bookings, setBookings] = useState(getBookings)

  useEffect(() => {
    const handleUpdate = () => setBookings(getBookings())

    window.addEventListener('bookings-changed', handleUpdate)
    window.addEventListener('storage', handleUpdate)

    return () => {
      window.removeEventListener('bookings-changed', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [])

  return bookings
}
