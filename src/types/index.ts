export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
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

