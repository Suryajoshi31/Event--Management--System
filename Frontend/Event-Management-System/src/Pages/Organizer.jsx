import React, { useState } from 'react'
import { useBookingsState, updateBookingStatus } from '../utils/bookingStore'
import { addEvent } from '../data/eventsData'
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Hourglass,
  Ticket,
  DollarSign,
  User,
  Calendar,
  Sparkles,
  Search,
  Plus,
  X,
  MapPin,
  Clock,
  Tag,
  Image as ImageIcon,
  Check
} from 'lucide-react'

const Organizer = () => {
  const bookings = useBookingsState()
  const [filterStatus, setFilterStatus] = useState('All') // 'All' | 'Pending' | 'Approved' | 'Rejected'
  const [searchQuery, setSearchQuery] = useState('')
  const [actionSuccess, setActionSuccess] = useState(null)

  // Add Event Modal State
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false)
  const [eventTitle, setEventTitle] = useState('')
  const [eventCategory, setEventCategory] = useState('Music')
  const [eventDate, setEventDate] = useState('')
  const [eventTime, setEventTime] = useState('')
  const [eventLocation, setEventLocation] = useState('')
  const [eventPrice, setEventPrice] = useState('')
  const [eventOrganizer, setEventOrganizer] = useState('')
  const [eventImage, setEventImage] = useState('')

  const defaultImagePlaceholders = [
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80'
  ]

  const pendingList = bookings.filter((b) => b.status === 'Pending')
  const approvedList = bookings.filter((b) => b.status === 'Approved')
  const rejectedList = bookings.filter((b) => b.status === 'Rejected')

  const totalRevenue = approvedList.reduce((sum, b) => sum + (b.totalPrice || 0), 0)

  const handleApprove = (id, title) => {
    updateBookingStatus(id, 'Approved')
    setActionSuccess({ type: 'approved', message: `Approved ticket ${id} for ${title}` })
    setTimeout(() => setActionSuccess(null), 3000)
  }

  const handleReject = (id, title) => {
    updateBookingStatus(id, 'Rejected')
    setActionSuccess({ type: 'rejected', message: `Rejected ticket ${id} for ${title}` })
    setTimeout(() => setActionSuccess(null), 3000)
  }

  const handleCreateEvent = (e) => {
    e.preventDefault()
    if (!eventTitle.trim() || !eventLocation.trim() || !eventOrganizer.trim()) return

    const chosenImage =
      eventImage.trim() ||
      defaultImagePlaceholders[Math.floor(Math.random() * defaultImagePlaceholders.length)]

    addEvent({
      title: eventTitle.trim(),
      category: eventCategory,
      date: eventDate.trim() || 'SAT, DEC 12',
      time: eventTime.trim() || '7:00 PM',
      location: eventLocation.trim(),
      price: eventPrice === '' || Number(eventPrice) < 0 ? 0 : Number(eventPrice),
      organizer: eventOrganizer.trim(),
      image: chosenImage
    })

    setActionSuccess({
      type: 'approved',
      message: `🎉 New Event "${eventTitle}" created successfully! It is now live for ticket bookings.`
    })
    setTimeout(() => setActionSuccess(null), 4000)

    // Reset Form & Close Modal
    setEventTitle('')
    setEventCategory('Music')
    setEventDate('')
    setEventTime('')
    setEventLocation('')
    setEventPrice('')
    setEventOrganizer('')
    setEventImage('')
    setIsAddEventModalOpen(false)
  }

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = filterStatus === 'All' || b.status === filterStatus
    const matchesSearch =
      b.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.eventTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
      {/* Header Banner */}
      <div className="bg-[#141824] rounded-3xl p-8 sm:p-12 text-white mb-8 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#f05335] mb-3">
            <ShieldCheck size={18} />
            <span>Organizer Management Portal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4 leading-tight">
            Organizer Dashboard
          </h1>
          <p className="text-gray-300 text-base sm:text-lg mb-6 leading-relaxed">
            Create new events, review incoming attendee ticket requests, manage seat allocations, and approve or decline bookings in real-time.
          </p>
        </div>

        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-[#f05335]/20 blur-3xl pointer-events-none" />
      </div>

      {/* Toast Notification */}
      {actionSuccess && (
        <div
          className={`mb-6 p-4 rounded-2xl flex items-center justify-between font-bold text-sm shadow-md transition-all ${
            actionSuccess.type === 'approved'
              ? 'bg-emerald-500 text-white'
              : 'bg-rose-500 text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            {actionSuccess.type === 'approved' ? <Check size={18} /> : <X size={18} />}
            <span>{actionSuccess.message}</span>
          </div>
          <button type="button" onClick={() => setActionSuccess(null)} className="cursor-pointer opacity-80 hover:opacity-100">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 border border-amber-200 flex items-center justify-center font-bold">
            <Hourglass size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase">Pending Approvals</p>
            <p className="text-2xl font-black text-gray-900">{pendingList.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 border border-emerald-200 flex items-center justify-center font-bold">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase">Approved Passes</p>
            <p className="text-2xl font-black text-gray-900">{approvedList.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 border border-blue-200 flex items-center justify-center font-bold">
            <Ticket size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase">Total Bookings</p>
            <p className="text-2xl font-black text-gray-900">{bookings.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center font-bold">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase">Approved Sales</p>
            <p className="text-2xl font-black text-gray-900">${totalRevenue}</p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-3xl border border-gray-200 mb-8 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Status Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap border ${
                filterStatus === status
                  ? 'bg-[#141824] text-white border-[#141824]'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {status === 'Pending' && `⏳ Pending (${pendingList.length})`}
              {status === 'Approved' && `✅ Approved (${approvedList.length})`}
              {status === 'Rejected' && `❌ Rejected (${rejectedList.length})`}
              {status === 'All' && `All Requests (${bookings.length})`}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[260px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by buyer name, email or ticket ID..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#f05335]"
          />
        </div>
      </div>

      {/* Ticket Booking Approval Queue */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
        {/* Header Section with ADD EVENT button on OPPOSITE side */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
          <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
            <Ticket size={22} className="text-[#f05335]" />
            <span>Ticket Booking Approval Queue</span>
          </h2>

          {/* ADD EVENT BUTTON ON OPPOSITE SIDE */}
          <button
            type="button"
            onClick={() => setIsAddEventModalOpen(true)}
            className="px-5 py-2.5 rounded-2xl bg-[#f05335] hover:bg-[#d94429] text-white font-extrabold text-sm transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2 self-start sm:self-auto shrink-0"
          >
            <Plus size={18} />
            <span>Add New Event</span>
          </button>
        </div>

        {filteredBookings.length > 0 ? (
          <div className="space-y-4">
            {filteredBookings.map((b) => (
              <div
                key={b.id}
                className="bg-gray-50 hover:bg-gray-100/70 p-5 rounded-2xl border border-gray-200/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Event & Buyer Info */}
                <div className="flex items-start gap-4">
                  <img
                    src={b.eventImage}
                    alt={b.eventTitle}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 hidden sm:block"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-extrabold text-[#f05335] bg-[#f05335]/10 px-2.5 py-0.5 rounded-md">
                        {b.id}
                      </span>
                      <span className="text-xs text-gray-400 font-semibold">
                        {new Date(b.bookedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h4 className="text-base font-black text-gray-900">{b.eventTitle}</h4>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600 mt-1">
                      <span className="flex items-center gap-1 font-semibold text-gray-800">
                        <User size={13} className="text-gray-400" />
                        {b.userName} ({b.userEmail})
                      </span>
                      <span className="font-bold text-gray-900 bg-white px-2 py-0.5 rounded border border-gray-200">
                        {b.seats} {b.seats === 1 ? 'Seat' : 'Seats'}
                      </span>
                      <span className="font-extrabold text-gray-900">
                        Total: {b.totalPrice === 0 ? 'FREE' : `$${b.totalPrice}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status & Action Buttons */}
                <div className="flex items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-gray-200">
                  {b.status === 'Pending' && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleReject(b.id, b.eventTitle)}
                        className="px-4 py-2 rounded-xl bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <XCircle size={15} /> Reject
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApprove(b.id, b.eventTitle)}
                        className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                      >
                        <CheckCircle2 size={15} /> Approve
                      </button>
                    </div>
                  )}

                  {b.status === 'Approved' && (
                    <div className="flex items-center gap-3">
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 size={14} /> Approved
                      </span>
                      <button
                        type="button"
                        onClick={() => handleReject(b.id, b.eventTitle)}
                        className="text-xs text-gray-400 hover:text-rose-600 underline font-medium cursor-pointer"
                      >
                        Revoke
                      </button>
                    </div>
                  )}

                  {b.status === 'Rejected' && (
                    <div className="flex items-center gap-3">
                      <span className="bg-rose-100 text-rose-800 text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1">
                        <XCircle size={14} /> Rejected
                      </span>
                      <button
                        type="button"
                        onClick={() => handleApprove(b.id, b.eventTitle)}
                        className="text-xs text-gray-400 hover:text-emerald-600 underline font-medium cursor-pointer"
                      >
                        Re-Approve
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-gray-500 font-medium">
            No ticket requests matching your current filter.
          </div>
        )}
      </div>

      {/* ADD EVENT MODAL */}
      {isAddEventModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl animate-in fade-in zoom-in duration-200 my-8">
            <button
              type="button"
              onClick={() => setIsAddEventModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 bg-gray-100 rounded-full cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#f05335] mb-1">
              <Sparkles size={16} />
              <span>Organizer Tools</span>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-1">
              Create & Publish New Event
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Fill in the details below to publish a new live event for user ticket bookings.
            </p>

            <form onSubmit={handleCreateEvent} className="space-y-4">
              {/* Event Title */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="e.g. Neon Horizon EDM Music Fest"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#f05335]"
                />
              </div>

              {/* Grid: Category & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                    Category *
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <select
                      value={eventCategory}
                      onChange={(e) => setEventCategory(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#f05335]"
                    >
                      <option value="Music">Music</option>
                      <option value="Tech">Tech</option>
                      <option value="Food & Drink">Food & Drink</option>
                      <option value="Sports">Sports</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                    Ticket Price ($ USD) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="number"
                      min="0"
                      step="1"
                      required
                      value={eventPrice}
                      onChange={(e) => setEventPrice(e.target.value)}
                      placeholder="0 for Free event"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#f05335]"
                    />
                  </div>
                </div>
              </div>

              {/* Grid: Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                    Date (e.g. SAT, DEC 12)
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      placeholder="e.g. SAT, DEC 12"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#f05335]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                    Time (e.g. 7:00 PM)
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      value={eventTime}
                      onChange={(e) => setEventTime(e.target.value)}
                      placeholder="e.g. 7:00 PM"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#f05335]"
                    />
                  </div>
                </div>
              </div>

              {/* Location & Venue */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                  Venue & Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    required
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    placeholder="e.g. Skyline Arena, Central City"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#f05335]"
                  />
                </div>
              </div>

              {/* Organizer Name */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                  Organizer Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    required
                    value={eventOrganizer}
                    onChange={(e) => setEventOrganizer(e.target.value)}
                    placeholder="e.g. Apex Productions"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#f05335]"
                  />
                </div>
              </div>

              {/* Cover Image URL */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                  Cover Image URL (Optional)
                </label>
                <div className="relative">
                  <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="url"
                    value={eventImage}
                    onChange={(e) => setEventImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#f05335]"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Leave empty to automatically use a curated high-res event poster.
                </p>
              </div>

              {/* Footer Modal Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddEventModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#f05335] hover:bg-[#d94429] text-white font-extrabold text-sm transition-all cursor-pointer shadow-md flex items-center gap-2"
                >
                  <Plus size={16} />
                  <span>Publish Event</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Organizer
