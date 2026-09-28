import { useState, useEffect } from 'react'

const FAVORITES_STORAGE_KEY = 'event_management_favorites'

export const getFavorites = () => {
  try {
    const data = localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (!data) {
      // Default sample favorite
      const initial = ['1']
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(initial))
      return initial
    }
    return JSON.parse(data)
  } catch (e) {
    console.error('Error reading favorites from localStorage:', e)
    return []
  }
}

export const saveFavorites = (favorites) => {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
    window.dispatchEvent(new CustomEvent('favorites-changed'))
  } catch (e) {
    console.error('Error saving favorites to localStorage:', e)
  }
}

export const toggleFavorite = (eventId) => {
  const current = getFavorites()
  const idStr = String(eventId)
  let updated
  if (current.includes(idStr)) {
    updated = current.filter((id) => id !== idStr)
  } else {
    updated = [...current, idStr]
  }
  saveFavorites(updated)
  return updated
}

export const isFavorite = (eventId) => {
  const current = getFavorites()
  return current.includes(String(eventId))
}

export const useFavoritesState = () => {
  const [favorites, setFavorites] = useState(getFavorites)

  useEffect(() => {
    const handleUpdate = () => setFavorites(getFavorites())

    window.addEventListener('favorites-changed', handleUpdate)
    window.addEventListener('storage', handleUpdate)

    return () => {
      window.removeEventListener('favorites-changed', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [])

  return favorites
}
