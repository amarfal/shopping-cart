import { Link } from "react-router-dom"
import { SHOP_MENU } from "@/lib/data/products"

interface ShopDropdownProps {
  onClose: () => void
}

export function ShopDropdown({ onClose }: ShopDropdownProps) {
  return (
    <div className="relative w-full bg-background border-b border-border shadow-2xl animate-in slide-in-from-top-2 duration-200">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-4 gap-12">
          {/* New & Featured Column */}
          <div>
            <h3 className="font-bold text-base mb-4">New & Featured</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/shop"
                  onClick={onClose}
                  className="text-foreground-muted hover:text-foreground transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  onClick={onClose}
                  className="text-foreground-muted hover:text-foreground transition-colors"
                >
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  onClick={onClose}
                  className="text-foreground-muted hover:text-foreground transition-colors"
                >
                  Latest Drops
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  onClick={onClose}
                  className="text-foreground-muted hover:text-foreground transition-colors"
                >
                  Shop All Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Shoes Column */}
          <div>
            <h3 className="font-bold text-base mb-4">{SHOP_MENU.shoes.label}</h3>
            <ul className="space-y-3 text-sm">
              {SHOP_MENU.shoes.subcategories.map((sub) => (
                <li key={sub}>
                  <Link
                    to={sub === "All Shoes" ? "/shop?category=shoes" : `/shop?category=shoes&sub=${encodeURIComponent(sub)}`}
                    onClick={onClose}
                    className="text-foreground-muted hover:text-foreground transition-colors"
                  >
                    {sub}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Clothing Column */}
          <div>
            <h3 className="font-bold text-base mb-4">{SHOP_MENU.clothing.label}</h3>
            <ul className="space-y-3 text-sm">
              {SHOP_MENU.clothing.subcategories.map((sub) => (
                <li key={sub}>
                  <Link
                    to={sub === "All Clothing" ? "/shop?category=clothing" : `/shop?category=clothing&sub=${encodeURIComponent(sub)}`}
                    onClick={onClose}
                    className="text-foreground-muted hover:text-foreground transition-colors"
                  >
                    {sub}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Accessories Column */}
          <div>
            <h3 className="font-bold text-base mb-4">{SHOP_MENU.accessories.label}</h3>
            <ul className="space-y-3 text-sm">
              {SHOP_MENU.accessories.subcategories.map((sub) => (
                <li key={sub}>
                  <Link
                    to={sub === "All Accessories" ? "/shop?category=accessories" : `/shop?category=accessories&sub=${encodeURIComponent(sub)}`}
                    onClick={onClose}
                    className="text-foreground-muted hover:text-foreground transition-colors"
                  >
                    {sub}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
