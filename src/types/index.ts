export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: "shoes" | "clothing" | "accessories"
  subcategory?: string
  image: string
  images?: string[]
  sizes?: string[]
  colors?: string[]
  rating?: { rate: number; count: number }
}

export interface CartItem {
  product: Product
  quantity: number
}

export type CartAction =
  | { type: "ADD_ITEM"; product: Product }
  | { type: "INCREMENT_ITEM"; productId: number }
  | { type: "DECREMENT_ITEM"; productId: number }
  | { type: "REMOVE_ITEM"; productId: number }
  | { type: "CLEAR_CART" }
  | { type: "HYDRATE_CART"; items: CartItem[] }

