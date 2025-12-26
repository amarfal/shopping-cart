import { useCart } from "@/providers/CartProvider"
import { CartList } from "@/components/cart/CartList"
import { CartSummary } from "@/components/cart/CartSummary"

export function Cart() {
  const { items } = useCart()

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold">Bag</h1>

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
  )
}

