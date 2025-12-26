import { useCart } from "@/providers/CartProvider"
import { Button } from "@/components/ui/button"

export function CartSummary() {
  const { subtotal, total, totalItemCount } = useCart()

  return (
    <div className="rounded-2xl border border-border bg-background-secondary p-6">
      <h2 className="text-xl font-bold mb-6">Summary</h2>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-foreground-muted">Subtotal ({totalItemCount} items)</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-foreground-muted">Estimated Shipping</span>
          <span className="font-medium text-green-600">Free</span>
        </div>

        <div className="border-t border-border pt-4 mt-4">
          <div className="flex justify-between text-base">
            <span className="font-bold">Total</span>
            <span className="font-bold">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Button
        size="lg"
        className="mt-6 w-full"
        disabled
      >
        Checkout
      </Button>
      <p className="mt-3 text-center text-xs text-foreground-muted">
        Demo only — checkout not functional
      </p>
    </div>
  )
}
