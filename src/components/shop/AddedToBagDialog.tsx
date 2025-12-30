import { useEffect } from "react"
import { Link } from "react-router-dom"
import { X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/useCart"
import type { Product } from "@/types"

interface AddedToBagDialogProps {
  product: Product | null
  selectedSize?: string | null
  open: boolean
  onClose: () => void
}

export function AddedToBagDialog({
  product,
  selectedSize,
  open,
  onClose,
}: AddedToBagDialogProps) {
  const { totalItemCount } = useCart()

  // Auto-dismiss after 5 seconds
  useEffect(() => {
    if (!open) return
    const timer = setTimeout(onClose, 5000)
    return () => clearTimeout(timer)
  }, [open, onClose])

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (open) {
      document.addEventListener("keydown", handleEscape)
    }
    return () => document.removeEventListener("keydown", handleEscape)
  }, [open, onClose])

  if (!open || !product) return null

  const categoryLabel =
    product.category === "shoes"
      ? "Shoes"
      : product.category === "clothing"
      ? "Clothing"
      : "Accessories"

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-50"
        onClick={onClose}
      />

      {/* Dialog - positioned top right */}
      <div className="fixed top-16 right-4 sm:right-8 z-50 w-[340px] bg-background rounded-lg shadow-2xl border border-border animate-in slide-in-from-top-2 fade-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold">Added to Bag</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Product Info */}
        <div className="p-4 flex gap-4">
          <div className="w-20 h-20 rounded-lg bg-background-secondary overflow-hidden shrink-0">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold line-clamp-2">{product.title}</h4>
            <p className="text-sm text-foreground-muted">{categoryLabel}</p>
            {selectedSize && (
              <p className="text-sm text-foreground-muted">Size {selectedSize}</p>
            )}
            <p className="text-sm font-semibold mt-1">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 pt-0 space-y-3">
          <Link to="/cart" onClick={onClose}>
            <Button variant="outline" className="w-full">
              View Bag ({totalItemCount})
            </Button>
          </Link>
          <Button className="w-full" disabled>
            Checkout
          </Button>
        </div>
      </div>
    </>
  )
}

