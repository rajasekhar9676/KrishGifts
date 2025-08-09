'use client'

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react'

export interface WishlistItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating?: number
  description?: string
  inStock?: boolean
  isNew?: boolean
  isFeatured?: boolean
  badge?: string
  reviews?: number
}

interface WishlistContextType {
  items: WishlistItem[]
  add: (item: WishlistItem) => void
  remove: (id: string) => void
  toggle: (item: WishlistItem) => void
  contains: (id: string) => boolean
  clear: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export const useWishlist = () => {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<WishlistItem[]>([])

  useEffect(() => {
    const raw = localStorage.getItem('krish-gifts-wishlist')
    if (raw) setItems(JSON.parse(raw))
  }, [])

  useEffect(() => {
    localStorage.setItem('krish-gifts-wishlist', JSON.stringify(items))
  }, [items])

  const add = (item: WishlistItem) => {
    setItems(prev => (prev.some(i => i.id === item.id) ? prev : [...prev, item]))
  }

  const remove = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const toggle = (item: WishlistItem) => {
    setItems(prev => (prev.some(i => i.id === item.id) ? prev.filter(i => i.id !== item.id) : [...prev, item]))
  }

  const contains = (id: string) => items.some(i => i.id === id)

  const clear = () => setItems([])

  const value = useMemo(
    () => ({ items, add, remove, toggle, contains, clear }),
    [items]
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}


