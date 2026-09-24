import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

const API_URL = 'http://localhost:5000/api'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user_data')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [token, setToken] = useState(() => {
    return localStorage.getItem('user_token') || null
  })
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login') // 'login' or 'signup'

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode)
    setIsAuthModalOpen(true)
  }

  const closeAuthModal = () => {
    setIsAuthModalOpen(false)
  }

  // Login handler
  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Login failed')
      }

      setUser(data)
      setToken(data.token)
      localStorage.setItem('user_data', JSON.stringify(data))
      localStorage.setItem('user_token', data.token)
      closeAuthModal()
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  // Signup handler
  const signup = async (name, email, password, role = 'user') => {
    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Signup failed')
      }

      setUser(data)
      setToken(data.token)
      localStorage.setItem('user_data', JSON.stringify(data))
      localStorage.setItem('user_token', data.token)
      closeAuthModal()
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  // Logout handler
  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('user_data')
    localStorage.removeItem('user_token')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        signup,
        logout,
        isAuthModalOpen,
        authMode,
        openAuthModal,
        closeAuthModal,
        setAuthMode,
        API_URL,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
