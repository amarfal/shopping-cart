import type { Product } from "@/types"
import { Card, CardContent } from "@/components/ui/card"

interface ProductCardProps {
  product: Product
  onClick: () => void
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer overflow-hidden smooth-transition hover:scale-105 hover:shadow-lg hover:border-primary"
    >
      <div className="aspect-square overflow-hidden bg-white">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain p-4 smooth-transition group-hover:scale-110"
        />
      </div>
      <CardContent className="p-4">
        <p className="mb-1 text-xs uppercase tracking-wide text-foreground-muted">
          {product.category}
        </p>
        <h3 className="mb-2 line-clamp-2 text-sm font-medium">{product.title}</h3>
        <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
      </CardContent>
    </Card>
  )
}

