import React from 'react'
import { Search, Ticket, QrCode, ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const steps = [
  {
    step: '01',
    icon: Search,
    title: 'Explore & Discover',
    description: 'Browse top live concerts, tech summits, food festivals, and sports tournaments across Nepal.',
    badge: 'Step 1'
  },
  {
    step: '02',
    icon: Ticket,
    title: 'Select Seats & Book',
    description: 'Choose your seat quantity with transparent pricing in Nepali Rupees (Rs.) and submit instant booking requests.',
    badge: 'Step 2'
  },
  {
    step: '03',
    icon: QrCode,
    title: 'Get Digital QR Pass',
    description: 'Receive your verified QR entry pass in real-time, present it at the venue, and enjoy fast check-in.',
    badge: 'Step 3'
  }
]

const HowItWorks = () => {
  return (
    <section className="w-full py-16 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#f05335] bg-[#f05335]/10 px-4 py-1.5 rounded-full mb-3">
          <Sparkles size={16} />
          <span>Simple 3-Step Process</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#141824] tracking-tight">
          How Eventora Works
        </h2>
        <p className="text-gray-600 text-base sm:text-lg mt-3 leading-relaxed">
          From finding exciting events in Nepal to walking through the venue doors — event ticketing made fast, simple, and reliable.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {steps.map((item, idx) => {
          const IconComponent = item.icon
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-xs hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between overflow-hidden"
            >
              {/* Giant background step number */}
              <span className="absolute -right-2 -top-4 text-7xl font-black text-gray-100 select-none group-hover:text-[#f05335]/10 transition-colors">
                {item.step}
              </span>

              <div>
                {/* Badge & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#141824] text-white flex items-center justify-center shadow-md group-hover:bg-[#f05335] transition-colors duration-300">
                    <IconComponent size={26} />
                  </div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                    {item.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-black text-[#141824] mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom decorative bar */}
              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center text-xs font-bold text-[#f05335] group-hover:translate-x-1 transition-transform">
                <span>Learn more</span>
                <ArrowRight size={14} className="ml-1" />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default HowItWorks
