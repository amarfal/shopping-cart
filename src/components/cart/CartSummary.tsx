import { useCart } from "@/providers/CartProvider"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function CartSummary() {
  const { subtotal, total } = useCart()

  return (
    <div className="rounded-lg border border-gray-800 bg-background-secondary p-6">
      <h2 className="mb-6 text-xl font-bold">Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-foreground-muted">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-foreground-muted">Estimated Shipping</span>
          <span className="font-medium">Free</span>
        </div>

        <Separator />

        <div className="flex justify-between text-lg">
          <span className="font-bold">Total</span>
          <span className="font-bold">${total.toFixed(2)}</span>
        </div>
      </div>

      <Button
        size="lg"
        className="mt-6 w-full"
        disabled
        title="Checkout is UI only"
      >
        Checkout (UI Only)
      </Button>
      <p className="mt-2 text-center text-xs text-foreground-muted">
        This is a demo project - no real checkout
      </p>
    </div>
  )
}

