import React from 'react'
import { Clock, Ticket, Shield } from 'lucide-react'

const featureData = [
  {
    id: 1,
    icon: Clock,
    title: 'Fast Booking',
    description:
      'Secure your tickets instantly with our fast streamlined booking infrastructure built for speed.',
  },
  {
    id: 2,
    icon: Ticket,
    title: 'Seamless Access',
    description:
      'Download tickets instantly or manage them right from your personal dashboard with easily.',
  },
  {
    id: 3,
    icon: Shield,
    title: 'Secure Platform',
    description:
      'All transactions and registrations are bounded by cutting-edge security and 2FA OTP tech.',
  },
]

const FeatureCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16">
      {featureData.map((feature) => {
        const IconComponent = feature.icon
        return (
          <div
            key={feature.id}
            className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group"
          >
            <div className="w-16 h-16 bg-[#141824] rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-transform duration-300 shadow-sm">
              <IconComponent size={28} strokeWidth={2} />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#141824] mb-3 tracking-tight">
              {feature.title}
            </h3>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-sm">
              {feature.description}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default FeatureCards
