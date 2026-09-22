import React from 'react'
import { Calendar, MapPin, Tag, ArrowUpRight, Heart } from 'lucide-react'

const EventCard = ({ event }) => {
  const {
    title,
    date,
    time,
    location,
    category,
    price,
    image,
    organizer,
    isPopular,
  } = event

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-gray-200/80 hover:border-gray-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Event Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

          {/* Category & Tag Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-[#141824] shadow-xs">
              {category}
            </span>
            {isPopular && (
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#f05335] text-white shadow-xs">
                Popular
              </span>
            )}
          </div>

          {/* Like / Wishlist Button */}
          <button
            type="button"
            aria-label="Save event"
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-gray-700 hover:text-red-500 transition-colors shadow-xs cursor-pointer"
          >
            <Heart size={16} />
          </button>

          {/* Price Badge on Image */}
          <div className="absolute bottom-4 right-4 bg-[#141824]/95 text-white backdrop-blur-md px-3.5 py-1.5 rounded-xl font-bold text-sm shadow-md">
            {price === 0 ? 'FREE' : `$${price}`}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          {/* Date & Time */}
          <div className="flex items-center gap-2 text-xs font-bold text-[#f05335] tracking-wider uppercase mb-2">
            <Calendar size={14} className="shrink-0" />
            <span>{date} • {time}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-extrabold text-[#141824] leading-snug group-hover:text-[#f05335] transition-colors line-clamp-2 mb-3">
            {title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-4">
            <MapPin size={16} className="shrink-0 text-gray-400" />
            <span className="truncate">{location}</span>
          </div>
        </div>
      </div>

      {/* Footer / CTA Action */}
      <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-gray-100 mt-2">
        <div className="text-xs text-gray-400 font-medium pt-4">
          By <span className="text-gray-700 font-semibold">{organizer}</span>
        </div>

        <button
          type="button"
          className="mt-4 px-4 py-2.5 rounded-xl bg-[#141824] hover:bg-black text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-xs group-hover:shadow-md cursor-pointer"
        >
          <span>Get Ticket</span>
          <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  )
}

export default EventCard
