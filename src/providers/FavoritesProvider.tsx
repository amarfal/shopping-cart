import { createContext, useState, useEffect, useCallback, type ReactNode } from "react"
import type { Product } from "@/types"
import { STORAGE_KEYS } from "@/lib/constants"

interface FavoritesContextType {
  favorites: Product[]
  addFavorite: (product: Product) => void
  removeFavorite: (productId: number) => void
  toggleFavorite: (product: Product) => void
  isFavorite: (productId: number) => boolean
  favoriteCount: number
}

export const FavoritesContext = createContext<FavoritesContextType | null>(null)

function loadFavorites(): Product[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error("Failed to load favorites:", error)
  }
  return []
}

function saveFavorites(favorites: Product[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites))
  } catch (error) {
    console.error("Failed to save favorites:", error)
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage (same pattern as CartProvider)
  const [favorites, setFavorites] = useState<Product[]>(() => loadFavorites())

  // Persist to localStorage on changes
  useEffect(() => {
    saveFavorites(favorites)
  }, [favorites])

  const addFavorite = useCallback((product: Product) => {
    setFavorites((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev
      return [...prev, product]
    })
  }, [])

  const removeFavorite = useCallback((productId: number) => {
    setFavorites((prev) => prev.filter((p) => p.id !== productId))
  }, [])

  const toggleFavorite = useCallback((product: Product) => {
    setFavorites((prev) => {
      if (prev.some((p) => p.id === product.id)) {
        return prev.filter((p) => p.id !== product.id)
      }
      return [...prev, product]
    })
  }, [])

  const isFavorite = useCallback(
    (productId: number) => favorites.some((p) => p.id === productId),
    [favorites]
  )

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
        favoriteCount: favorites.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

