import React, { useState, useEffect } from 'react'
import { useEventsState } from '../data/eventsData'
import { addBooking, cancelBooking, useBookingsState } from '../utils/bookingStore'
import { useAuth } from '../context/AuthContext'
import {
  Ticket,
  Plus,
  Minus,
  Calendar,
  MapPin,
  Clock,
  User,
  Mail,
  CheckCircle2,
  XCircle,
  Hourglass,
  Sparkles,
  QrCode,
  X,
  Search,
  Check
} from 'lucide-react'

const MyTicket = () => {
  const { user, token, openAuthModal, API_URL } = useAuth()
  const events = useEventsState()
  const localBookings = useBookingsState()
  const [dbBookings, setDbBookings] = useState([])
  const [activeTab, setActiveTab] = useState('events') // 'events' | 'my-tickets'
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  // Seat quantities map: { eventId: quantity }
  const [seatCounts, setSeatCounts] = useState({})

  // Booking Modal State
  const [bookingModalEvent, setBookingModalEvent] = useState(null)
  const [buyerName, setBuyerName] = useState('')
  const [buyerEmail, setBuyerEmail] = useState('')
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Selected ticket for QR pass preview modal
  const [selectedPassModal, setSelectedPassModal] = useState(null)

  const categories = ['All', 'Music', 'Tech', 'Food & Drink', 'Sports']

  // Fetch backend bookings when user/token changes
  useEffect(() => {
    if (token) {
      fetch(`${API_URL}/bookings/my-bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setDbBookings(
              data.map((b) => ({
                id: b.ticketId || b._id,
                eventId: b.eventId,
                eventTitle: b.eventTitle,
                eventDate: b.eventDate,
                eventTime: b.eventTime,
                eventLocation: b.eventLocation,
                eventImage: b.eventImage,
                userName: b.userName,
                userEmail: b.userEmail,
                seats: b.seats,
                unitPrice: b.unitPrice,
                totalPrice: b.totalPrice,
                status: b.status === 'Confirmed' ? 'Approved' : b.status,
                bookedAt: b.bookedAt,
              }))
            )
          }
        })
        .catch((err) => console.log('Fetch DB bookings error:', err))
    }
  }, [token, API_URL])

  const bookings = token && dbBookings.length > 0 ? dbBookings : localBookings

  const handleSeatChange = (eventId, delta) => {
    setSeatCounts((prev) => {
      const current = prev[eventId] || 1
      const updated = Math.max(1, Math.min(10, current + delta))
      return { ...prev, [eventId]: updated }
    })
  }

  const openBookingModal = (event) => {
    if (!user) {
      openAuthModal('login')
      return
    }
    setBookingModalEvent(event)
    setBuyerName(user?.name || '')
    setBuyerEmail(user?.email || '')
    setBookingSuccessMsg('')
  }

  const handleConfirmBooking = async (e) => {
    e.preventDefault()
    if (!buyerName.trim() || !buyerEmail.trim() || !bookingModalEvent) return

    const seats = seatCounts[bookingModalEvent.id] || 1
    const unitPrice = bookingModalEvent.price
    const totalPrice = unitPrice * seats

    setIsSubmitting(true)

    let createdBooking = null

    if (token) {
      try {
        const res = await fetch(`${API_URL}/bookings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            eventId: bookingModalEvent.id,
            eventTitle: bookingModalEvent.title,
            eventDate: bookingModalEvent.date,
            eventTime: bookingModalEvent.time,
            eventLocation: bookingModalEvent.location,
            eventImage: bookingModalEvent.image,
            seats,
            unitPrice,
          }),
        })

        if (res.ok) {
          const newDbBooking = await res.json()
          createdBooking = {
            id: newDbBooking.ticketId,
            eventId: newDbBooking.eventId,
            eventTitle: newDbBooking.eventTitle,
            eventDate: newDbBooking.eventDate,
            eventTime: newDbBooking.eventTime,
            eventLocation: newDbBooking.eventLocation,
            eventImage: newDbBooking.eventImage,
            userName: newDbBooking.userName,
            userEmail: newDbBooking.userEmail,
            seats: newDbBooking.seats,
            unitPrice: newDbBooking.unitPrice,
            totalPrice: newDbBooking.totalPrice,
            status: 'Approved',
          }
          setDbBookings((prev) => [createdBooking, ...prev])
        }
      } catch (err) {
        console.error('Backend booking error:', err)
      }
    }

    if (!createdBooking) {
      addBooking({
        eventId: bookingModalEvent.id,
        eventTitle: bookingModalEvent.title,
        eventDate: bookingModalEvent.date,
        eventTime: bookingModalEvent.time,
        eventLocation: bookingModalEvent.location,
        eventImage: bookingModalEvent.image,
        userName: buyerName.trim(),
        userEmail: buyerEmail.trim(),
        seats,
        unitPrice,
        totalPrice,
      })
    }

    setIsSubmitting(false)
    setBookingSuccessMsg('🎉 Ticket booking request submitted successfully!')
    setTimeout(() => {
      setBookingModalEvent(null)
      setBookingSuccessMsg('')
      setActiveTab('my-tickets')
    }, 1500)
  }

  const filteredEvents = events.filter((event) => {
    const matchesCat =
      selectedCategory === 'All' ||
      event.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  const pendingCount = bookings.filter((b) => b.status === 'Pending').length
  const approvedCount = bookings.filter((b) => b.status === 'Approved').length

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
      {/* Header Banner */}
      <div className="bg-[#141824] rounded-3xl p-8 sm:p-12 text-white mb-8 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#f05335] mb-3">
            <Sparkles size={18} />
            <span>Ticket Booking & Pass Management</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4 leading-tight">
            My Tickets & Events
          </h1>
          <p className="text-gray-300 text-base sm:text-lg mb-6 leading-relaxed">
            Browse all upcoming live events, choose your required number of seats, book instant passes, and track your booking approval status.
          </p>

          {/* Quick Stats Pill */}
          <div className="flex flex-wrap gap-4 pt-2">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-2xl flex items-center gap-3">
              <Ticket className="text-[#f05335]" size={20} />
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase">Total Events</p>
                <p className="text-lg font-extrabold text-white">{events.length}</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-2xl flex items-center gap-3">
              <Hourglass className="text-amber-400" size={20} />
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase">Pending Requests</p>
                <p className="text-lg font-extrabold text-amber-300">{pendingCount}</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-2xl flex items-center gap-3">
              <CheckCircle2 className="text-emerald-400" size={20} />
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase">Approved Passes</p>
                <p className="text-lg font-extrabold text-emerald-300">{approvedCount}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-[#f05335]/20 blur-3xl pointer-events-none" />
      </div>

      {/* Primary Navigation Tabs */}
      <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-4">
        <button
          type="button"
          onClick={() => setActiveTab('events')}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-extrabold transition-all cursor-pointer ${
            activeTab === 'events'
              ? 'bg-[#141824] text-white shadow-md'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
          }`}
        >
          <Ticket size={18} />
          <span>Book Tickets (All Events)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('my-tickets')}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-extrabold transition-all cursor-pointer relative ${
            activeTab === 'my-tickets'
              ? 'bg-[#141824] text-white shadow-md'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
          }`}
        >
          <QrCode size={18} />
          <span>My Purchased Tickets</span>
          {bookings.length > 0 && (
            <span className="ml-1 bg-[#f05335] text-white text-xs px-2 py-0.5 rounded-full font-bold">
              {bookings.length}
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: ALL EVENTS LIST WITH SEAT BOOKING */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap border ${
                    selectedCategory === cat
                      ? 'bg-[#141824] text-white border-[#141824]'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search event name or venue..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#f05335]"
              />
            </div>
          </div>

          {/* Events List View */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {filteredEvents.map((event) => {
                const seats = seatCounts[event.id] || 1
                const totalCost = event.price === 0 ? 0 : event.price * seats

                return (
                  <div
                    key={event.id}
                    className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row gap-6 items-stretch"
                  >
                    {/* Event Poster Image */}
                    <div className="lg:w-72 h-48 lg:h-auto rounded-2xl overflow-hidden relative shrink-0">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 bg-[#141824]/80 backdrop-blur-md text-white text-xs font-black uppercase px-3 py-1 rounded-full border border-white/20">
                        {event.category}
                      </div>
                      {event.price === 0 ? (
                        <div className="absolute bottom-3 left-3 bg-emerald-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-sm">
                          FREE ADMISSION
                        </div>
                      ) : (
                        <div className="absolute bottom-3 left-3 bg-[#f05335] text-white text-xs font-black px-3 py-1 rounded-full shadow-sm">
                          ${event.price} / seat
                        </div>
                      )}
                    </div>

                    {/* Details Column */}
                    <div className="flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-500 mb-2">
                          <span className="flex items-center gap-1.5 text-[#f05335]">
                            <Calendar size={14} />
                            {event.date}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock size={14} />
                            {event.time}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mb-2">
                          {event.title}
                        </h3>

                        <p className="flex items-center gap-1.5 text-sm text-gray-600 mb-3">
                          <MapPin size={16} className="text-gray-400 shrink-0" />
                          <span>{event.location}</span>
                        </p>

                        <p className="text-xs text-gray-500">
                          Organized by <strong className="text-gray-800">{event.organizer}</strong>
                        </p>
                      </div>

                      {/* Seat Counter & Booking Box */}
                      <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                        {/* Required Seats Selector */}
                        <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-200">
                          <span className="text-xs font-bold uppercase text-gray-500 px-2">
                            Select Seats:
                          </span>
                          <button
                            type="button"
                            onClick={() => handleSeatChange(event.id, -1)}
                            className="w-8 h-8 rounded-xl bg-white border border-gray-200 text-gray-700 flex items-center justify-center font-bold hover:bg-gray-100 active:scale-95 cursor-pointer"
                            aria-label="Decrease seats"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-base font-black text-gray-900">
                            {seats}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleSeatChange(event.id, 1)}
                            className="w-8 h-8 rounded-xl bg-white border border-gray-200 text-gray-700 flex items-center justify-center font-bold hover:bg-gray-100 active:scale-95 cursor-pointer"
                            aria-label="Increase seats"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Price Calculation & Action */}
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-xs text-gray-500 font-semibold">Total Price ({seats} {seats === 1 ? 'seat' : 'seats'})</p>
                            <p className="text-xl font-black text-gray-900">
                              {totalCost === 0 ? 'FREE' : `$${totalCost}`}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => openBookingModal(event)}
                            className="px-6 py-3 rounded-2xl bg-[#f05335] hover:bg-[#d94429] text-white font-extrabold text-sm transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
                          >
                            <Ticket size={18} />
                            <span>Book Now</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-gray-300 text-gray-500 font-medium">
              No events found matching your search.
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MY PURCHASED TICKETS & BOOKING HISTORY */}
      {activeTab === 'my-tickets' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-gray-200">
            <div>
              <h2 className="text-xl font-black text-gray-900">My Purchased Passes</h2>
              <p className="text-sm text-gray-500">
                Track your active ticket requests and view digital entrance passes.
              </p>
            </div>
            <div className="text-right text-sm font-semibold text-gray-500">
              Total Reservations: <span className="font-bold text-gray-900">{bookings.length}</span>
            </div>
          </div>

          {bookings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings.map((booking) => {
                const isApproved = booking.status === 'Approved'
                const isPending = booking.status === 'Pending'
                const isRejected = booking.status === 'Rejected'

                return (
                  <div
                    key={booking.id}
                    className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Ticket Header Image */}
                      <div className="h-40 relative">
                        <img
                          src={booking.eventImage}
                          alt={booking.eventTitle}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Status Badge */}
                        <div className="absolute top-3 right-3">
                          {isApproved && (
                            <span className="bg-emerald-500 text-white text-xs font-black uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                              <CheckCircle2 size={14} /> Approved
                            </span>
                          )}
                          {isPending && (
                            <span className="bg-amber-400 text-amber-950 text-xs font-black uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                              <Hourglass size={14} /> Pending Approval
                            </span>
                          )}
                          {isRejected && (
                            <span className="bg-rose-500 text-white text-xs font-black uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                              <XCircle size={14} /> Rejected
                            </span>
                          )}
                        </div>

                        <div className="absolute bottom-3 left-3 text-white">
                          <p className="text-xs font-bold text-gray-300">{booking.id}</p>
                          <h3 className="text-lg font-black leading-tight drop-shadow-sm">
                            {booking.eventTitle}
                          </h3>
                        </div>
                      </div>

                      {/* Ticket Details Body */}
                      <div className="p-5 space-y-3">
                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                          <Calendar size={14} className="text-[#f05335]" />
                          <span>{booking.eventDate} ({booking.eventTime})</span>
                        </div>

                        <div className="flex items-start gap-2 text-xs text-gray-600">
                          <MapPin size={14} className="text-gray-400 shrink-0 mt-0.5" />
                          <span>{booking.eventLocation}</span>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-700">
                          <div>
                            <p className="text-gray-400">Booked Seats</p>
                            <p className="text-sm font-extrabold text-gray-900">{booking.seats} {booking.seats === 1 ? 'Seat' : 'Seats'}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-400">Total Price</p>
                            <p className="text-sm font-extrabold text-gray-900">
                              {booking.totalPrice === 0 ? 'FREE' : `$${booking.totalPrice}`}
                            </p>
                          </div>
                        </div>

                        <div className="text-xs text-gray-500 pt-1">
                          Reserved by: <strong className="text-gray-800">{booking.userName}</strong> ({booking.userEmail})
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="p-5 pt-0 border-t border-gray-100 flex items-center justify-between gap-3 mt-2">
                      {isApproved && (
                        <button
                          type="button"
                          onClick={() => setSelectedPassModal(booking)}
                          className="w-full py-2.5 rounded-xl bg-[#141824] hover:bg-gray-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                        >
                          <QrCode size={16} />
                          <span>View QR Pass</span>
                        </button>
                      )}

                      {isPending && (
                        <button
                          type="button"
                          onClick={() => cancelBooking(booking.id)}
                          className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-rose-50 text-gray-600 hover:text-rose-600 border border-gray-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          <X size={14} />
                          <span>Cancel Request</span>
                        </button>
                      )}

                      {isRejected && (
                        <p className="text-xs text-rose-500 font-medium italic w-full text-center py-1">
                          This booking request was declined by the organizer.
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-gray-300 text-gray-500 font-medium">
              You haven't booked any tickets yet. Switch to <strong>Book Tickets</strong> tab to reserve your seats!
            </div>
          )}
        </div>
      )}

      {/* BOOKING MODAL */}
      {bookingModalEvent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <button
              type="button"
              onClick={() => setBookingModalEvent(null)}
              className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 bg-gray-100 rounded-full cursor-pointer"
            >
              <X size={18} />
            </button>

            <h3 className="text-2xl font-black text-gray-900 mb-1">
              Confirm Ticket Booking
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Complete your details to submit your seat reservation request.
            </p>

            {bookingSuccessMsg ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-center font-bold text-sm my-4 flex flex-col items-center gap-2">
                <Check className="w-10 h-10 bg-emerald-500 text-white rounded-full p-2" />
                {bookingSuccessMsg}
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-4">
                {/* Event Overview Box */}
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex gap-4 items-center">
                  <img
                    src={bookingModalEvent.image}
                    alt={bookingModalEvent.title}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm leading-snug">
                      {bookingModalEvent.title}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {bookingModalEvent.date} &bull; {bookingModalEvent.time}
                    </p>
                    <p className="text-xs font-bold text-[#f05335] mt-1">
                      {seatCounts[bookingModalEvent.id] || 1} Seat(s) &bull; Total:{' '}
                      {bookingModalEvent.price === 0
                        ? 'FREE'
                        : `$${bookingModalEvent.price * (seatCounts[bookingModalEvent.id] || 1)}`}
                    </p>
                  </div>
                </div>

                {/* Input: Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                    Your Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      required
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="e.g. Jane Doe"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#f05335]"
                    />
                  </div>
                </div>

                {/* Input: Email */}
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      required
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      placeholder="e.g. jane@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#f05335]"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setBookingModalEvent(null)}
                    className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#f05335] hover:bg-[#d94429] text-white font-extrabold text-sm transition-all cursor-pointer shadow-md"
                  >
                    Submit Booking Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* QR PASS PREVIEW MODAL */}
      {selectedPassModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <button
              type="button"
              onClick={() => setSelectedPassModal(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 bg-gray-100 rounded-full cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="inline-block bg-emerald-100 text-emerald-700 p-3 rounded-full mb-3">
              <CheckCircle2 size={28} />
            </div>

            <h3 className="text-xl font-black text-gray-900 mb-1">Official Event Pass</h3>
            <p className="text-xs text-gray-500 mb-4">Present this QR pass at the venue entrance.</p>

            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 mb-4 inline-block">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                  selectedPassModal.id
                )}`}
                alt="Ticket QR Code"
                className="w-44 h-44 mx-auto rounded-xl"
              />
            </div>

            <div className="text-left bg-gray-50 p-3.5 rounded-xl border border-gray-100 text-xs space-y-1 mb-4">
              <p>
                <span className="text-gray-400">Ticket ID:</span>{' '}
                <strong className="text-gray-900">{selectedPassModal.id}</strong>
              </p>
              <p>
                <span className="text-gray-400">Pass Holder:</span>{' '}
                <strong className="text-gray-900">{selectedPassModal.userName}</strong>
              </p>
              <p>
                <span className="text-gray-400">Seats Reserved:</span>{' '}
                <strong className="text-gray-900">{selectedPassModal.seats} Seat(s)</strong>
              </p>
              <p>
                <span className="text-gray-400">Event:</span>{' '}
                <strong className="text-gray-900">{selectedPassModal.eventTitle}</strong>
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedPassModal(null)}
              className="w-full py-2.5 rounded-xl bg-[#141824] text-white font-bold text-sm cursor-pointer"
            >
              Close Pass
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyTicket
