import type { CartItem } from "@/types"
import { STORAGE_KEYS } from "@/lib/constants"

export function loadCart() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CART)
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(items))
}
