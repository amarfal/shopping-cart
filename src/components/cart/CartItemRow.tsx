import type { CartItem } from "@/types"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "@/providers/CartProvider"

interface CartItemRowProps {
  item: CartItem
}

const MAX_QUANTITY = 10

export function CartItemRow({ item }: CartItemRowProps) {
  const { incrementItem, decrementItem, removeItem } = useCart()
  const { product, quantity } = item

  return (
    <div>
      <div className="flex gap-4 py-6">
        <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg bg-white">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain p-2"
          />
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex justify-between">
            <div className="flex-1">
              <p className="mb-1 text-xs uppercase tracking-wide text-foreground-muted">
                {product.category}
              </p>
              <h3 className="mb-2 text-base font-medium">{product.title}</h3>
              <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeItem(product.id)}
              className="h-8 w-8 text-foreground-muted hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-gray-800 bg-background-secondary">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => decrementItem(product.id)}
                className="h-8 w-8"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center text-sm font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => incrementItem(product.id)}
                disabled={quantity >= MAX_QUANTITY}
                className="h-8 w-8"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {quantity >= MAX_QUANTITY && (
              <span className="text-xs text-foreground-muted">Max quantity</span>
            )}
          </div>
        </div>
      </div>
      <Separator />
    </div>
  )
}

