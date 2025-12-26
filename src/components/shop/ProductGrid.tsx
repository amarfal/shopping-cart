import type { Product } from "@/types"
import { ProductCard } from "./ProductCard"

interface ProductGridProps {
  products: Product[]
  onProductClick: (product: Product) => void
}

export function ProductGrid({ products, onProductClick }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => onProductClick(product)}
        />
      ))}
    </div>
  )
}
