import React from 'react'
import { Link } from 'react-router-dom'
import EventCard from './EventCard'
import { Sparkles, ArrowRight } from 'lucide-react'
import { useEventsState } from '../data/eventsData'

const UpcomingEvents = ({ limit = 3 }) => {
  const events = useEventsState()
  const displayedEvents = events.slice(0, limit)

  return (
    <section className="w-full py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#f05335] mb-2">
            <Sparkles size={16} />
            <span>Featured Highlights</span>
          </div>
          <h2 className="text-2xl sm:text-2xl md:text-4xl font-black uppercase text-[#141824] tracking-tight">
            Upcoming Events
          </h2>
        </div>

        <Link
          to="/event"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-gray-200 hover:border-gray-400 text-[#141824] font-bold text-sm transition-all shadow-xs hover:shadow-md shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <span>View All Events</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Top 3 Event Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {displayedEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  )
}

export default UpcomingEvents
