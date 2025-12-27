import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Search, ShoppingBag, Menu } from "lucide-react"
import { useCart } from "@/providers/CartProvider"
import { cn } from "@/lib/utils"
import { SearchOverlay } from "./SearchOverlay"

export function Navbar() {
  const { totalItemCount } = useCart()
  const location = useLocation()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const isActive = (path: string) => location.pathname === path

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-background border-b border-border">
        <div className="w-full flex h-14 items-center justify-between px-6 sm:px-8 lg:px-12">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/sike-logo-removebg-preview.png" alt="Sike" className="h-12 w-12" />
            <span className="heading-display text-3xl tracking-wide">Sike</span>
          </Link>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={cn(
                "text-base font-semibold smooth-transition",
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
                "text-base font-semibold smooth-transition",
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
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full hover:bg-background-secondary smooth-transition cursor-pointer"
            >
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
            <button className="p-2 rounded-full hover:bg-background-secondary smooth-transition cursor-pointer md:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
