import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
  onClick: () => void
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <article
      onClick={onClick}
      className="group cursor-pointer"
    >
      {/* Image Container */}
      <div className="aspect-square overflow-hidden bg-background-secondary rounded-lg mb-4">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain p-6"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-1">
        <p className="text-sm text-foreground-muted capitalize font-medium">
          {product.category}
        </p>
        <h3 className="font-semibold line-clamp-2 group-hover:text-foreground-muted transition-colors duration-200">
          {product.title}
        </h3>
        <p className="font-semibold">${product.price.toFixed(2)}</p>
      </div>
    </article>
  )
}
