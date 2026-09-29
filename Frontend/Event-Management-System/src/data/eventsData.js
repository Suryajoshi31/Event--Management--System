import { useState, useEffect } from 'react'

export const sampleEvents = [
  {
    id: '1',
    title: 'Neon Pulse Synthwave Concert',
    date: 'SAT, OCT 14',
    time: '8:00 PM',
    location: 'Skyline Amphitheater, Downtown',
    category: 'Music',
    price: 1500,
    organizer: 'Sonic Pulse Live',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    title: 'Global Tech & AI Summit 2026',
    date: 'WED, OCT 18',
    time: '9:30 AM',
    location: 'Metropolitan Convention Center',
    category: 'Tech',
    price: 3500,
    organizer: 'DevSphere Inc.',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    title: 'Artisan Food & Craft Beer Festival',
    date: 'SUN, OCT 22',
    time: '12:00 PM',
    location: 'Riverside Waterfront Park',
    category: 'Food & Drink',
    price: 0,
    organizer: 'Urban Eats Collective',
    isPopular: false,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    title: 'Championship 3v3 Basketball Tournament',
    date: 'SAT, OCT 28',
    time: '2:00 PM',
    location: 'Downtown Arena Courts',
    category: 'Sports',
    price: 500,
    organizer: 'StreetBall League',
    isPopular: false,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '5',
    title: 'Indie Film & VR Showcase',
    date: 'FRI, NOV 03',
    time: '6:30 PM',
    location: 'Cineplex Studio 4',
    category: 'Tech',
    price: 800,
    organizer: 'Creative Visions',
    isPopular: false,
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '6',
    title: 'Midnight Jazz & Soul Night',
    date: 'SAT, NOV 11',
    time: '10:00 PM',
    location: 'The Blue Note Lounge',
    category: 'Music',
    price: 1200,
    organizer: 'Blue Note Productions',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80',
  },
]

const API_URL = 'http://localhost:5000/api'
const EVENTS_STORAGE_KEY = 'event_management_custom_events'

export const getEvents = () => {
  try {
    const data = localStorage.getItem(EVENTS_STORAGE_KEY)
    if (!data) {
      localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(sampleEvents))
      return sampleEvents
    }
    return JSON.parse(data)
  } catch (e) {
    console.error('Error loading local events:', e)
    return sampleEvents
  }
}

export const createBackendEvent = async (eventData, token) => {
  try {
    const res = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
    })
    const data = await res.json()
    if (res.ok) {
      window.dispatchEvent(new CustomEvent('events-changed'))
      return { success: true, event: data }
    } else {
      return { success: false, message: data.message }
    }
  } catch (err) {
    console.error('Create Event Error:', err)
    return { success: false, message: err.message }
  }
}

export const addEvent = (newEventData) => {
  const currentEvents = getEvents()
  const newEvent = {
    id: String(Date.now()),
    isPopular: true,
    ...newEventData
  }
  const updatedEvents = [newEvent, ...currentEvents]
  try {
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(updatedEvents))
    window.dispatchEvent(new CustomEvent('events-changed'))
  } catch (e) {
    console.error('Error saving new event:', e)
  }
  return newEvent
}

export const useEventsState = () => {
  const [events, setEvents] = useState(getEvents)

  const fetchApiEvents = () => {
    fetch(`${API_URL}/events`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((item) => ({
            id: item._id || String(item.id),
            title: item.title,
            date: item.date,
            time: item.time || '7:00 PM',
            location: item.location,
            category: item.category || 'Music',
            price: item.price || 0,
            organizer: item.organizer || 'Event Organizer',
            image: item.image || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
            description: item.description || '',
            availableSeats: item.availableSeats || 100,
          }))
          setEvents(mapped)
          localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(mapped))
        }
      })
      .catch((err) => console.log('Events API offline, using cached events'))
  }

  useEffect(() => {
    fetchApiEvents()
    const handleUpdate = () => {
      fetchApiEvents()
    }
    window.addEventListener('events-changed', handleUpdate)
    window.addEventListener('storage', handleUpdate)
    return () => {
      window.removeEventListener('events-changed', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [])

  return events
}

