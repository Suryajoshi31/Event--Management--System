import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { name: 'Discover', path: '/' },
    { name: 'Event', path: '/event' },
    { name: 'My Tickets', path: '/tickets' },
    { name: 'Organizer', path: '/organizer' },
  ]

  return (
    <header className="w-full bg-[#f3f4f6] px-4 py-4 sm:px-8 border-b border-gray-200/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <Link
          to="/"
          className="flex items-center gap-1 text-2xl sm:text-3xl font-black tracking-tight text-[#141824] font-sans group"
        >
          <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#f05335] inline-block transition-transform group-hover:scale-125" />
          <span>STUB</span>
        </Link>

        <nav className="hidden md:flex items-center bg-white rounded-full p-1.5 border border-gray-200/90 shadow-xs">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap ${isActive
                  ? 'bg-[#151922] text-white shadow-sm'
                  : 'text-[#4b5563] hover:text-[#111827] hover:bg-gray-100/70'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {mobileMenuOpen && (
        <div className="md:hidden mt-3 bg-white rounded-2xl p-3 border border-gray-200 shadow-lg flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/'}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl text-base font-semibold transition-all ${isActive
                  ? 'bg-[#151922] text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}

export default Navbar

