import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Hero from './Components/Hero'
import UpcomingEvents from './Components/UpcomingEvents'
import Event from './Pages/Event'

const DiscoverPage = () => (
  <div>
    <Hero />
    <UpcomingEvents />
  </div>
)

const TicketsPage = () => (
  <div className="max-w-7xl mx-auto px-4 py-12">
    <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200/80 shadow-xs">
      <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
        My Tickets
      </h1>
      <p className="text-gray-600 text-lg mb-6">Manage your purchased passes, QR entry tickets, and booking history.</p>
      <div className="p-8 rounded-2xl bg-gray-50 border border-dashed border-gray-300 text-center text-gray-500 font-medium">
        No active tickets found. Explore Discover to book your next experience!
      </div>
    </div>
  </div>
)

const OrganizerPage = () => (
  <div className="max-w-7xl mx-auto px-4 py-12">
    <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200/80 shadow-xs">
      <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
        Organizer Dashboard
      </h1>
      <p className="text-gray-600 text-lg mb-6">Create new events, track ticket sales, and view analytics in real-time.</p>
      <div className="p-8 rounded-2xl bg-gray-50 border border-dashed border-gray-300 text-center text-gray-500 font-medium">
        Organizer tools and event creation form.
      </div>
    </div>
  </div>
)

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col justify-between bg-[#f8f9fa] font-sans antialiased text-gray-900">
        <div>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<DiscoverPage />} />
              <Route path="/discover" element={<DiscoverPage />} />
              <Route path="/event" element={<Event />} />
              <Route path="/tickets" element={<TicketsPage />} />
              <Route path="/organizer" element={<OrganizerPage />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
