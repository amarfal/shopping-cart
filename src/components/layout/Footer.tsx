import { Link } from "react-router-dom"
import { SHOP_MENU } from "@/lib/data/products"

const HELP_LINKS = [
  { label: "Order Status", href: "#" },
  { label: "Shipping & Delivery", href: "#" },
  { label: "Returns", href: "#" },
  { label: "Contact Us", href: "#" },
]

const ABOUT_LINKS = [
  { label: "About Sike", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Sustainability", href: "#" },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Shop Links */}
          <div>
            <h3 className="font-bold text-sm mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/shop?category=shoes"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  {SHOP_MENU.shoes.label}
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=clothing"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  {SHOP_MENU.clothing.label}
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=accessories"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  {SHOP_MENU.accessories.label}
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="font-bold text-sm mb-4">Help</h3>
            <ul className="space-y-2 text-sm">
              {HELP_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h3 className="font-bold text-sm mb-4">About</h3>
            <ul className="space-y-2 text-sm">
              {ABOUT_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Info */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img
                src="/sike-logo-removebg-preview.png"
                alt="Sike"
                className="h-10 w-10 invert"
              />
              <span className="heading-display text-2xl tracking-wide">Sike</span>
            </Link>
            <p className="text-sm text-background/70 max-w-xs">
              Empowering athletes everywhere. Just did it.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="mx-auto max-w-7xl px-6 py-4 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-background/50">
            <p>© {new Date().getFullYear()} Sike, Inc. All Rights Reserved</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-background transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-background transition-colors">
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

