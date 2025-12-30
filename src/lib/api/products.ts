import type { Product } from "@/types"
import { products } from "@/lib/data/products"

export function getProducts(): Promise<Product[]> {
  return Promise.resolve(products)
}

export function getProductById(id: number): Promise<Product | undefined> {
  return Promise.resolve(products.find((p) => p.id === id))
}
