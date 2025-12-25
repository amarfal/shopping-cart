import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import type { CartItem, Product } from "@/types"
import { cartReducer } from "@/lib/cart/cartReducer"
import { loadCart, saveCart } from "@/lib/cart/localStorage"
import { getTotalItemCount, getSubtotal, getTotal } from "@/lib/cart/cartSelectors"

interface CartContextValue {
  items: CartItem[]
  totalItemCount: number
  subtotal: number
  total: number
  addItem: (product: Product) => void
  incrementItem: (productId: number) => void
  decrementItem: (productId: number) => void
  removeItem: (productId: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, [], () => loadCart())

  useEffect(() => {
    saveCart(items)
  }, [items])

  const value: CartContextValue = {
    items,
    totalItemCount: getTotalItemCount(items),
    subtotal: getSubtotal(items),
    total: getTotal(items),
    addItem: (product) => dispatch({ type: "ADD_ITEM", product }),
    incrementItem: (productId) => dispatch({ type: "INCREMENT_ITEM", productId }),
    decrementItem: (productId) => dispatch({ type: "DECREMENT_ITEM", productId }),
    removeItem: (productId) => dispatch({ type: "REMOVE_ITEM", productId }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}

