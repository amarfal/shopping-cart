import { Link, useLocation } from "react-router-dom"
import { Search, ShoppingBag, Menu } from "lucide-react"
import { useCart } from "@/providers/CartProvider"
import { cn } from "@/lib/utils"

export function Navbar() {
  const { totalItemCount } = useCart()
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="text-2xl font-black tracking-tighter">
          SIKE
        </Link>

        {/* Center Navigation */}
        <div className="hidden md:flex items-center gap-6">
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
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-background-secondary smooth-transition">
            <Search className="h-5 w-5" />
          </button>
          <Link
            to="/cart"
            className="relative p-2 rounded-full hover:bg-background-secondary smooth-transition"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white px-1">
                {totalItemCount}
              </span>
            )}
          </Link>
          <button className="p-2 rounded-full hover:bg-background-secondary smooth-transition md:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  )
}
