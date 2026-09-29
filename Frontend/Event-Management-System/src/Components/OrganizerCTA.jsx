import React from 'react'
import { Link } from 'react-router-dom'
import { PlusCircle, Ticket, Sparkles, ArrowRight } from 'lucide-react'

const OrganizerCTA = () => {
  return (
    <section className="w-full py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-[#141824] via-[#1f273b] to-[#141824] rounded-3xl p-8 sm:p-12 text-white border border-gray-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#f05335] mb-3">
            <Sparkles size={16} />
            <span>Host Your Own Event</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight mb-4 leading-tight">
            Are You an Event Organizer?
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
            Publish your live concert, tech conference, workshop, or sports tournament on Eventora. Track seat reservations, view total revenue in NPR, and manage attendee tickets in real-time.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/organizer"
              className="px-6 py-3.5 rounded-2xl bg-[#f05335] hover:bg-[#d94429] text-white font-extrabold text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle size={18} />
              <span>Create & Publish Event</span>
            </Link>
            <Link
              to="/tickets"
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Ticket size={18} />
              <span>Book Event Tickets</span>
            </Link>
          </div>
        </div>

        <div className="relative z-10 hidden lg:block shrink-0">
          <div className="w-48 h-48 rounded-full bg-[#f05335]/20 flex items-center justify-center border border-[#f05335]/30 p-4 animate-pulse">
            <div className="w-36 h-36 rounded-full bg-[#f05335] flex items-center justify-center shadow-2xl text-white font-black text-center text-sm p-4 leading-snug">
              Publish Live Events Today!
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrganizerCTA
