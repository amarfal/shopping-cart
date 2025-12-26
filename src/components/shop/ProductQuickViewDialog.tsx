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
      <DialogContent className="max-w-4xl">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="aspect-square overflow-hidden rounded-lg bg-white">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-contain p-8"
            />
          </div>

          <div className="flex flex-col">
            <DialogHeader className="mb-4">
              <p className="mb-2 text-sm uppercase tracking-wide text-foreground-muted">
                {product.category}
              </p>
              <DialogTitle className="text-2xl">{product.title}</DialogTitle>
              <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
            </DialogHeader>

            <DialogDescription className="mb-6 flex-1 text-base text-foreground-muted">
              {product.description}
            </DialogDescription>

            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full"
                onClick={handleAddToBag}
                disabled={isAtMaxQuantity}
              >
                {isAtMaxQuantity
                  ? "Max Quantity Reached (10)"
                  : currentQuantity > 0
                    ? `Add to Bag (${currentQuantity} in bag)`
                    : "Add to Bag"}
              </Button>
              {isAtMaxQuantity && (
                <p className="text-center text-sm text-foreground-muted">
                  Maximum quantity per item is 10
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

