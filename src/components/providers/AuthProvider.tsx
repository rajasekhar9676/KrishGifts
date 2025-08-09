'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (data: { name: string; email: string; phone?: string; password: string }) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('krish-gifts-user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const getUsers = (): Array<User & { passwordHash: string }> => {
    const raw = localStorage.getItem('krish-gifts-users')
    return raw ? JSON.parse(raw) : []
  }

  const saveUsers = (users: Array<User & { passwordHash: string }>) => {
    localStorage.setItem('krish-gifts-users', JSON.stringify(users))
  }

  const hashPassword = (password: string) => {
    // Lightweight client-side hash for demo purposes only
    if (typeof window === 'undefined') return password
    try {
      return btoa(unescape(encodeURIComponent(password)))
    } catch {
      return password
    }
  }

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 400))
      const users = getUsers()
      const candidate = users.find(u => u.email.toLowerCase() === email.toLowerCase())
      if (!candidate) throw new Error('User not found')
      if (candidate.passwordHash !== hashPassword(password)) throw new Error('Invalid credentials')

      const { passwordHash, ...safeUser } = candidate
      setUser(safeUser)
      localStorage.setItem('krish-gifts-user', JSON.stringify(safeUser))
    } catch (error) {
      throw new Error('Login failed')
    } finally {
      setLoading(false)
    }
  }

  const register = async (data: { name: string; email: string; phone?: string; password: string }) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 400))
      const users = getUsers()
      const exists = users.some(u => u.email.toLowerCase() === data.email.toLowerCase())
      if (exists) throw new Error('Email already registered')

      const newUser: User & { passwordHash: string } = {
        id: String(Date.now()),
        name: data.name,
        email: data.email,
        phone: data.phone,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        passwordHash: hashPassword(data.password)
      }
      const nextUsers = [...users, newUser]
      saveUsers(nextUsers)

      const { passwordHash, ...safeUser } = newUser
      setUser(safeUser)
      localStorage.setItem('krish-gifts-user', JSON.stringify(safeUser))
    } catch (error) {
      throw new Error('Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('krish-gifts-user')
  }

  const value = {
    user,
    login,
    register,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 