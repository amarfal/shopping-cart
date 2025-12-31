import { Link } from "react-router-dom"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const categoryLabel = product.category === "shoes" ? "Shoes" : product.category === "clothing" ? "Clothing" : "Accessories"

  return (
    <Link to={`/shop/${product.id}`}>
      <article className="group cursor-pointer">
        {/* Image Container */}
        <div className="aspect-square overflow-hidden bg-background-secondary rounded-lg mb-4">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          <p className="text-sm text-foreground-muted font-medium">
            {categoryLabel}
          </p>
          <h3 className="font-semibold line-clamp-2 group-hover:text-foreground-muted transition-colors">
            {product.title}
          </h3>
          <p className="font-semibold">${product.price.toFixed(2)}</p>
        </div>
      </article>
    </Link>
  )
}
