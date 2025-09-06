import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const AuthCtx = createContext()

const API_BASE = import.meta.env.VITE_API_BASE || 'https://e-commerce-backend-16mq.onrender.com'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  })

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    }
  }, [token])

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user))
    else localStorage.removeItem('user')
  }, [user])

  function login(data) {
    setToken(data.token)
    setUser({ id: data.userId, name: data.name, email: data.email })
  }
  function logout() {
    setToken(null); setUser(null)
  }

  return <AuthCtx.Provider value={{ token, user, login, logout, API_BASE }}>{children}</AuthCtx.Provider>
}

export const useAuth = () => useContext(AuthCtx)
