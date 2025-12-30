import { Link } from "react-router-dom"
import { useCart } from "@/hooks/useCart"
import { CartList } from "@/components/cart/CartList"
import { CartSummary } from "@/components/cart/CartSummary"
import { ProductGrid } from "@/components/shop/ProductGrid"
import { products } from "@/lib/data/products"

// Get some recommended products
const RECOMMENDED = products.slice(0, 4)

export function Cart() {
  const { items } = useCart()

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {items.length === 0 ? (
          <CartList />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
            {/* Left: Bag */}
            <div>
              <h1 className="heading-display text-2xl mb-6">Bag</h1>
              <CartList />
              
              {/* Favorites CTA */}
              <div className="mt-8 py-6 border-t border-border">
                <h3 className="font-bold mb-2">Favorites</h3>
                <p className="text-sm text-foreground-muted">
                  Want to view your favorites?{" "}
                  <Link to="/favorites" className="underline">View Favorites</Link>
                </p>
              </div>
            </div>

            {/* Right: Summary */}
            <div>
              <div className="sticky top-20">
                <CartSummary />
              </div>
            </div>
          </div>
        )}

        {/* You Might Also Like */}
        {items.length > 0 && (
          <section className="mt-16">
            <h2 className="heading-display text-2xl mb-6">You Might Also Like</h2>
            <ProductGrid products={RECOMMENDED} />
          </section>
        )}
      </div>
    </div>
  )
}
