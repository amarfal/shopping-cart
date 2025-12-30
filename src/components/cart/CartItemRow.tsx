import { Link } from "react-router-dom"
import type { CartItem } from "@/types"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Minus, Heart, Truck, MapPin } from "lucide-react"
import { useCart } from "@/hooks/useCart"
import { useFavorites } from "@/hooks/useFavorites"
import { cn } from "@/lib/utils"
import { MAX_CART_QUANTITY } from "@/lib/constants"

interface CartItemRowProps {
  item: CartItem
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { incrementItem, decrementItem, removeItem } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { product, quantity } = item
  
  const isProductFavorite = isFavorite(product.id)
  const categoryLabel = product.category === "shoes" ? "Shoes" : product.category === "clothing" ? "Clothing" : "Accessories"

  return (
    <div className="py-6 border-b border-border">
      <div className="flex gap-4 sm:gap-6">
        {/* Image */}
        <Link to={`/shop/${product.id}`} className="shrink-0">
          <div className="h-28 w-28 sm:h-36 sm:w-36 overflow-hidden rounded-lg bg-background-secondary">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          </div>
        </Link>

        {/* Details */}
        <div className="flex flex-1 flex-col min-w-0">
          <div className="flex justify-between gap-4">
            <div className="min-w-0">
              <Link to={`/shop/${product.id}`} className="hover:underline">
                <h3 className="font-semibold truncate">{product.title}</h3>
              </Link>
              <p className="text-sm text-foreground-muted">{categoryLabel}</p>
              {product.colors && product.colors[0] && (
                <p className="text-sm text-foreground-muted">{product.colors[0]}</p>
              )}
              {product.sizes && product.sizes[0] && (
                <p className="text-sm text-foreground-muted underline cursor-pointer">
                  Size {product.sizes[0]}
                </p>
              )}
            </div>
            <p className="font-semibold shrink-0">${(product.price * quantity).toFixed(2)}</p>
          </div>

          {/* Controls */}
          <div className="mt-4 flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeItem(product.id)}
              className="h-8 w-8"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => decrementItem(product.id)}
                className="h-8 w-8"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-6 text-center text-sm font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => incrementItem(product.id)}
                disabled={quantity >= MAX_CART_QUANTITY}
                className="h-8 w-8"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleFavorite(product)}
              className="h-8 w-8"
            >
              <Heart className={cn("h-4 w-4", isProductFavorite && "fill-current")} />
            </Button>
          </div>
        </div>
      </div>

      {/* Shipping Info */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Truck className="h-4 w-4 text-foreground-muted" />
          <span className="font-medium">Shipping</span>
          <span className="text-foreground-muted">Arrives by Jan 15</span>
          <span className="underline cursor-pointer text-foreground-muted">Edit Location</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-foreground-muted" />
          <span className="font-medium">Free Pickup</span>
          <span className="underline cursor-pointer text-foreground-muted">Find a Store</span>
        </div>
      </div>
    </div>
  )
}
