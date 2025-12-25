import type { CartItem, CartAction } from "@/types"

const MAX_QUANTITY = 10

export function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.find((item) => item.product.id === action.product.id)
      if (existing) {
        return state.map((item) =>
          item.product.id === action.product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY) }
            : item
        )
      }
      return [...state, { product: action.product, quantity: 1 }]
    }

    case "INCREMENT_ITEM": {
      return state.map((item) =>
        item.product.id === action.productId
          ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY) }
          : item
      )
    }

    case "DECREMENT_ITEM": {
      return state
        .map((item) =>
          item.product.id === action.productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    }

    case "REMOVE_ITEM": {
      return state.filter((item) => item.product.id !== action.productId)
    }

    case "CLEAR_CART": {
      return []
    }

    case "HYDRATE_CART": {
      return action.items
    }

    default:
      return state
  }
}

