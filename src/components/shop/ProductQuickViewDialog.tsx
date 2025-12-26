import type { Product } from "@/types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useCart } from "@/providers/CartProvider"

interface ProductQuickViewDialogProps {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const MAX_QUANTITY = 10

export function ProductQuickViewDialog({
  product,
  open,
  onOpenChange,
}: ProductQuickViewDialogProps) {
  const { items, addItem } = useCart()

  if (!product) return null

  const cartItem = items.find((item) => item.product.id === product.id)
  const currentQuantity = cartItem?.quantity || 0
  const isAtMaxQuantity = currentQuantity >= MAX_QUANTITY

  const handleAddToBag = () => {
    if (!isAtMaxQuantity) {
      addItem(product)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="grid gap-0 md:grid-cols-2">
          {/* Image */}
          <div className="aspect-square bg-background-secondary rounded-l-2xl flex items-center justify-center p-8">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col p-8">
            <DialogHeader className="mb-6">
              <p className="text-sm text-foreground-muted capitalize mb-1">
                {product.category}
              </p>
              <DialogTitle className="text-2xl">{product.title}</DialogTitle>
              <p className="text-2xl font-bold mt-2">${product.price.toFixed(2)}</p>
            </DialogHeader>

            <DialogDescription className="flex-1 text-base leading-relaxed mb-8">
              {product.description}
            </DialogDescription>

            <div className="space-y-3 mt-auto">
              <Button
                size="lg"
                className="w-full"
                onClick={handleAddToBag}
                disabled={isAtMaxQuantity}
              >
                {isAtMaxQuantity
                  ? "Max Quantity Reached"
                  : currentQuantity > 0
                    ? `Add to Bag (${currentQuantity} in bag)`
                    : "Add to Bag"}
              </Button>
              {currentQuantity > 0 && !isAtMaxQuantity && (
                <p className="text-center text-sm text-foreground-muted">
                  {currentQuantity} already in your bag
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
