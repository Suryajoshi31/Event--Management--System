import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import AuthModal from './Components/AuthModal'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Hero from './Components/Hero'
import UpcomingEvents from './Components/UpcomingEvents'
import Event from './Pages/Event'
import MyTicket from './Pages/MyTicket'
import Organizer from './Pages/Organizer'

const DiscoverPage = () => (
  <div>
    <Hero />
    <UpcomingEvents />
  </div>
)

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col justify-between bg-[#f8f9fa] font-sans antialiased text-gray-900">
          <div>
            <Navbar />
            <AuthModal />
            <main>
              <Routes>
                <Route path="/" element={<DiscoverPage />} />
                <Route path="/discover" element={<DiscoverPage />} />
                <Route path="/event" element={<Event />} />
                <Route path="/tickets" element={<MyTicket />} />
                <Route path="/organizer" element={<Organizer />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
