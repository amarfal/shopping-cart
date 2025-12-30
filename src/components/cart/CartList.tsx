import { Link } from "react-router-dom"
import { useCart } from "@/hooks/useCart"
import { CartItemRow } from "./CartItemRow"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"

export function CartList() {
  const { items } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-6 p-4 rounded-full bg-background-secondary">
          <ShoppingBag className="h-12 w-12 text-foreground-muted" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Your Bag is Empty</h2>
        <p className="text-foreground-muted mb-6 max-w-sm">
          Looks like you haven't added anything to your bag yet.
        </p>
        <Link to="/shop">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      {items.map((item) => (
        <CartItemRow key={item.product.id} item={item} />
      ))}
    </div>
  )
}
