import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Search, ShoppingBag, Menu, Heart } from "lucide-react"
import { useCart } from "@/hooks/useCart"
import { useFavorites } from "@/hooks/useFavorites"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { SearchOverlay } from "./SearchOverlay"
import { ShopDropdown } from "./ShopDropdown"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { SHOP_MENU } from "@/lib/data/products"

export function Navbar() {
  const { totalItemCount } = useCart()
  const { favoriteCount } = useFavorites()
  const location = useLocation()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isShopHovered, setIsShopHovered] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
            <div
              onMouseEnter={() => setIsShopHovered(true)}
              onMouseLeave={() => setIsShopHovered(false)}
              className="relative py-4 -my-4"
            >
              <Link
                to="/shop"
                className={cn(
                  "text-base font-semibold smooth-transition",
                  isActive("/shop") || location.pathname.startsWith("/shop") || isShopHovered
                    ? "text-foreground"
                    : "text-foreground-muted hover:text-foreground"
                )}
              >
                Shop
              </Link>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Link
              to="/favorites"
              className="relative p-2 rounded-full hover:bg-background-secondary smooth-transition"
            >
              <Heart className="h-5 w-5" />
              {favoriteCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white px-1">
                  {favoriteCount}
                </span>
              )}
            </Link>
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
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Shop Dropdown Overlay - Fixed position, overlays content */}
      {isShopHovered && (
        <div className="fixed inset-0 top-14 z-40">
          {/* Backdrop - closes on hover */}
          <div 
            className="absolute inset-0 bg-black/30 animate-in fade-in duration-200"
            onClick={() => setIsShopHovered(false)}
            onMouseEnter={() => setIsShopHovered(false)}
          />
          {/* Dropdown Content - keeps menu open on hover */}
          <div
            onMouseEnter={() => setIsShopHovered(true)}
            onMouseLeave={() => setIsShopHovered(false)}
          >
            <ShopDropdown onClose={() => setIsShopHovered(false)} />
          </div>
        </div>
      )}

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Menu Sheet */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="right" className="w-[300px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="mt-8 space-y-8">
            {/* Navigation Links */}
            <div className="space-y-4">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "block text-lg font-semibold",
                  isActive("/") ? "text-foreground" : "text-foreground-muted"
                )}
              >
                Home
              </Link>
              <Link
                to="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "block text-lg font-semibold",
                  isActive("/shop") ? "text-foreground" : "text-foreground-muted"
                )}
              >
                Shop
              </Link>
            </div>

            {/* Shop Categories */}
            <div className="space-y-6">
              {/* Shoes */}
              <div>
                <h3 className="font-bold text-base mb-3">{SHOP_MENU.shoes.label}</h3>
                <ul className="space-y-2">
                  {SHOP_MENU.shoes.subcategories.map((sub) => (
                    <li key={sub}>
                      <Link
                        to={sub === "All Shoes" ? "/shop?category=shoes" : `/shop?category=shoes&sub=${encodeURIComponent(sub)}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-sm text-foreground-muted hover:text-foreground block"
                      >
                        {sub}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Clothing */}
              <div>
                <h3 className="font-bold text-base mb-3">{SHOP_MENU.clothing.label}</h3>
                <ul className="space-y-2">
                  {SHOP_MENU.clothing.subcategories.map((sub) => (
                    <li key={sub}>
                      <Link
                        to={sub === "All Clothing" ? "/shop?category=clothing" : `/shop?category=clothing&sub=${encodeURIComponent(sub)}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-sm text-foreground-muted hover:text-foreground block"
                      >
                        {sub}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Accessories */}
              <div>
                <h3 className="font-bold text-base mb-3">{SHOP_MENU.accessories.label}</h3>
                <ul className="space-y-2">
                  {SHOP_MENU.accessories.subcategories.map((sub) => (
                    <li key={sub}>
                      <Link
                        to={sub === "All Accessories" ? "/shop?category=accessories" : `/shop?category=accessories&sub=${encodeURIComponent(sub)}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-sm text-foreground-muted hover:text-foreground block"
                      >
                        {sub}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
