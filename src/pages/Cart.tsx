import { useCart } from "@/providers/CartProvider"
import { CartList } from "@/components/cart/CartList"
import { CartSummary } from "@/components/cart/CartSummary"

export function Cart() {
  const { items } = useCart()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="heading-display heading-md">Your Bag</h1>
          {items.length > 0 && (
            <p className="mt-2 text-foreground-muted">
              {items.length} {items.length === 1 ? "item" : "items"}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {items.length === 0 ? (
          <CartList />
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <CartList />
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <CartSummary />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
