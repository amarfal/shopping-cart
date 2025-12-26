import { Link } from "react-router-dom"
import { useCart } from "@/providers/CartProvider"
import { CartItemRow } from "./CartItemRow"
import { Button } from "@/components/ui/button"

export function CartList() {
  const { items } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="mb-4 text-lg text-foreground-muted">Your bag is empty</p>
        <Link to="/shop">
          <Button>Continue Shopping</Button>
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

