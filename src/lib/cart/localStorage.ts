import type { CartItem } from "@/types"

const CART_STORAGE_KEY = "nike-cart"

export function loadCart() {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    return stored ? (JSON.parse(stored) as CartItem[]) : []
  } catch {
    return []
  }
}

export function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
}

