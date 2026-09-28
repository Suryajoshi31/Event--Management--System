import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import EventCard from '../Components/EventCard'
import { useEventsState } from '../data/eventsData'
import { Search, Sparkles, SlidersHorizontal } from 'lucide-react'

const Event = () => {
  const events = useEventsState()
  const [searchParams] = useSearchParams()

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All')

  useEffect(() => {
    const s = searchParams.get('search')
    const c = searchParams.get('category')
    if (s !== null) setSearchQuery(s)
    if (c !== null) setSelectedCategory(c)
  }, [searchParams])

  const categories = ['All', 'Music', 'Tech', 'Food & Drink', 'Sports']

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      event.category.toLowerCase() === selectedCategory.toLowerCase()

    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
      {/* Header Banner */}
      <div className="bg-[#141824] rounded-3xl p-8 sm:p-12 text-white mb-10 relative overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#f05335] mb-3">
            <Sparkles size={16} />
            <span>Complete Catalogue</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4 leading-tight font-sans">
            Explore All Events
          </h1>
          <p className="text-gray-300 text-base sm:text-lg mb-8 leading-relaxed">
            Discover upcoming live music, tech summits, food festivals, and sports events. Filter by your preferences and grab your tickets in seconds.
          </p>

          {/* Search Input */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by event title, location, or organizer..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f05335] transition-all text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Decorative Graphic Background */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-[#f05335]/20 blur-3xl pointer-events-none" />
      </div>

      {/* Category Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap border ${
                selectedCategory === cat
                  ? 'bg-[#141824] text-white border-[#141824] shadow-xs'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="text-sm font-semibold text-gray-500 shrink-0">
          Showing <span className="text-[#141824] font-bold">{filteredEvents.length}</span> events
        </div>
      </div>

      {/* Event Cards Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-gray-300 text-gray-500 font-medium">
          No events matching your search or selected filter.
        </div>
      )}
    </div>
  )
}

export default Event
