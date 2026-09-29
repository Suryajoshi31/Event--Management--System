import React from 'react'
import { ShieldCheck, Zap, QrCode, TrendingUp, Users, HeartHandshake, CheckCircle2 } from 'lucide-react'

const features = [
  {
    icon: ShieldCheck,
    title: 'Verified Organizers & Venues',
    description: 'Every event is submitted and vetted through our organizer portal ensuring authentic tickets and safe venues.',
    color: 'bg-emerald-500'
  },
  {
    icon: QrCode,
    title: 'Instant QR Entry Passes',
    description: 'No physical tickets needed. Access digital QR passes instantly from your personal ticket dashboard.',
    color: 'bg-blue-500'
  },
  {
    icon: Zap,
    title: 'Nepali Rupee (Rs.) Pricing',
    description: 'Clear seat-based pricing in NPR with zero hidden processing fees or surprise checkout markups.',
    color: 'bg-[#f05335]'
  },
  {
    icon: TrendingUp,
    title: 'Real-Time Seat Management',
    description: 'Organizers can track incoming attendee bookings, view total sales in Rs., and approve tickets instantly.',
    color: 'bg-purple-500'
  }
]

const stats = [
  { label: 'Live Events Listed', value: '150+' },
  { label: 'Passes Issued', value: '12,500+' },
  { label: 'Active Attendees', value: '8,000+' },
  { label: 'Organizer Satisfaction', value: '99.4%' }
]

const WhyChooseUs = () => {
  return (
    <section className="w-full py-16 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="bg-[#141824] rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f05335]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Content */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#f05335] bg-white/10 px-4 py-1.5 rounded-full inline-block">
              Why Eventora?
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight">
              The Next-Gen Event Platform in Nepal
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              We empower event creators to host unforgettable experiences while giving attendees a frictionless ticket booking and entry pass system.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                  <p className="text-2xl sm:text-3xl font-black text-white">{stat.value}</p>
                  <p className="text-xs text-gray-400 font-semibold uppercase mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Feature Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((item, idx) => {
              const IconComponent = item.icon
              return (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-md border border-white/15 p-6 rounded-2xl hover:bg-white/15 transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 rounded-xl ${item.color} text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                    <IconComponent size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
