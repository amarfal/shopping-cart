import { Link, useLocation } from "react-router-dom"
import { ShoppingBag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/providers/CartProvider"
import { cn } from "@/lib/utils"

export function Navbar() {
  const { totalItemCount } = useCart()
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-800 bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          SIKE
        </Link>

        <div className="flex items-center gap-8">
          <Link
            to="/"
            className={cn(
              "text-sm font-medium smooth-transition",
              isActive("/")
                ? "text-foreground"
                : "text-foreground-muted hover:text-foreground"
            )}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className={cn(
              "text-sm font-medium smooth-transition",
              isActive("/shop")
                ? "text-foreground"
                : "text-foreground-muted hover:text-foreground"
            )}
          >
            Shop
          </Link>
          <Link
            to="/cart"
            className={cn(
              "relative flex items-center gap-2 text-sm font-medium smooth-transition",
              isActive("/cart")
                ? "text-foreground"
                : "text-foreground-muted hover:text-foreground"
            )}
          >
            <ShoppingBag className="h-5 w-5" />
            <span>Bag</span>
            {totalItemCount > 0 && (
              <Badge className="absolute -right-3 -top-2 h-5 min-w-5 rounded-full px-1.5">
                {totalItemCount}
              </Badge>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}

