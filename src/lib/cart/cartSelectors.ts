import type { CartItem } from "@/types"

export function getTotalItemCount(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

export function getSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
}

export function getTotal(items: CartItem[]) {
  return getSubtotal(items)
}

