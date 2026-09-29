import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, LogIn, UserCheck, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout, openAuthModal } = useAuth()

  const navItems = [
    { name: 'Discover', path: '/' },
    { name: 'Events', path: '/event' },
    { name: 'My Tickets', path: '/tickets' },
    { name: 'Organizer', path: '/organizer' },
  ]

  return (
    <header className="w-full bg-[#f3f4f6] px-4 py-4 sm:px-8 border-b border-gray-200/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-1 text-2xl sm:text-3xl font-black tracking-tight text-[#141824] font-sans group"
        >
          <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#f05335] inline-block transition-transform group-hover:scale-125" />
          <span>EVENTORA</span>
        </Link>

        {/* Navigation Items */}
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

        {/* Auth Actions */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3 bg-white px-4 py-1.5 rounded-full border border-gray-200 shadow-2xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-[#141824] text-white rounded-full flex items-center justify-center text-xs font-bold uppercase">
                  {user.name ? user.name.charAt(0) : 'U'}
                </div>
                <div className="text-xs">
                  <p className="font-bold text-[#141824] leading-tight">{user.name}</p>
                  <p className="text-[10px] text-gray-500 capitalize">{user.role}</p>
                </div>
              </div>
              <button
                onClick={logout}
                title="Sign Out"
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all cursor-pointer"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuthModal('login')}
                className="px-4 py-2 text-xs sm:text-sm font-bold text-gray-700 hover:text-[#141824] hover:bg-gray-200/60 rounded-full transition-all cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => openAuthModal('signup')}
                className="px-4 py-2 bg-[#141824] hover:bg-black text-white text-xs sm:text-sm font-bold rounded-full transition-all shadow-xs cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center gap-2">
          {user && (
            <div className="w-8 h-8 bg-[#141824] text-white rounded-full flex items-center justify-center text-xs font-bold uppercase">
              {user.name ? user.name.charAt(0) : 'U'}
            </div>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Dropdown */}
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

          <div className="border-t border-gray-100 pt-2 mt-1">
            {user ? (
              <button
                onClick={() => {
                  logout()
                  setMobileMenuOpen(false)
                }}
                className="w-full text-left px-4 py-3 text-red-600 font-semibold rounded-xl hover:bg-red-50 flex items-center gap-2 text-sm"
              >
                <LogOut size={16} /> Sign Out ({user.name})
              </button>
            ) : (
              <div className="flex flex-col gap-2 pt-1">
                <button
                  onClick={() => {
                    openAuthModal('login')
                    setMobileMenuOpen(false)
                  }}
                  className="w-full py-2.5 border border-gray-300 font-bold text-gray-800 rounded-xl text-sm"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    openAuthModal('signup')
                    setMobileMenuOpen(false)
                  }}
                  className="w-full py-2.5 bg-[#141824] text-white font-bold rounded-xl text-sm"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
