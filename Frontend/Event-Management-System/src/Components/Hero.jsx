import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FeatureCards from './FeatureCards'

const Hero = () => {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['All', 'Music', 'Tech', 'Food & Drink', 'Sports', 'This weekend']

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/event?search=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      navigate('/event')
    }
  }

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat)
    if (cat === 'All') {
      navigate('/event')
    } else {
      navigate(`/event?category=${encodeURIComponent(cat)}`)
    }
  }

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="max-w-3xl">
        {/* Event Count Badge */}
        <p className="text-sm sm:text-base font-bold tracking-wider uppercase text-[#f05335] mb-3">
          EXPLORE EVENTS NEAR YOU
        </p>

        {/* Big Bold Headline */}
        <h1 className="text-2xl sm:text-5xl md:text-4xl font-black uppercase text-[#141824] tracking-tight leading-[0.95] mb-6 font-sans">
          FIND YOUR NEXT <br />
          NIGHT OUT.
        </h1>

        {/* Subtitle Description */}
        <p className="text-gray-600 text-sm sm:text-xl leading-relaxed max-w-2xl mb-8">
          Browse live music, workshops, and meetups near you — book in a few taps, get a ticket stub with a QR code, and skip the line at the door.
        </p>

        {/* Search Bar Container */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-stretch gap-3 mb-6 max-w-2xl">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events, artists, venues..."
              className="w-full px-5 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-white border border-gray-300/80 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-400 text-gray-800 placeholder-gray-400 text-base shadow-xs transition-all"
            />
          </div>
          <button
            type="submit"
            className="px-8 py-3.5 sm:py-4 bg-[#141824] hover:bg-black text-white font-bold text-base rounded-xl sm:rounded-2xl transition-all shadow-xs shrink-0 cursor-pointer"
          >
            Search
          </button>
        </form>

        {/* Filter Pills */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryClick(cat)}
              className={`px-5 py-2 sm:py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer border ${activeCategory === cat
                  ? 'bg-[#141824] text-white border-[#141824] shadow-xs'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3 Feature Cards in a row below the options */}
      <FeatureCards />
    </section>
  )
}

export default Hero

