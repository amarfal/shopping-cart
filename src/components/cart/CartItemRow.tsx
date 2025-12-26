import type { CartItem } from "@/types"
import { Button } from "@/components/ui/button"
import { Minus, Plus, X } from "lucide-react"
import { useCart } from "@/providers/CartProvider"

interface CartItemRowProps {
  item: CartItem
}

const MAX_QUANTITY = 10

export function CartItemRow({ item }: CartItemRowProps) {
  const { incrementItem, decrementItem, removeItem } = useCart()
  const { product, quantity } = item

  return (
    <div className="flex gap-4 py-6 border-b border-border">
      {/* Image */}
      <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg bg-background-secondary">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain p-3"
        />
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div className="flex-1 pr-4">
            <p className="text-sm text-foreground-muted capitalize mb-1">
              {product.category}
            </p>
            <h3 className="font-medium mb-1">{product.title}</h3>
            <p className="text-foreground-muted">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <button
            onClick={() => removeItem(product.id)}
            className="p-1 h-fit text-foreground-muted hover:text-foreground smooth-transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Quantity Controls */}
        <div className="mt-auto pt-4 flex items-center gap-4">
          <div className="flex items-center border border-border-dark rounded-full">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => decrementItem(product.id)}
              className="h-8 w-8 rounded-full"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm font-medium">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => incrementItem(product.id)}
              disabled={quantity >= MAX_QUANTITY}
              className="h-8 w-8 rounded-full"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          {quantity >= MAX_QUANTITY && (
            <span className="text-xs text-foreground-muted">Max</span>
          )}
        </div>
      </div>
    </div>
  )
}
