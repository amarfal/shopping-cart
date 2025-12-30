import { Link } from "react-router-dom"
import { useFavorites } from "@/hooks/useFavorites"
import { ProductGrid } from "@/components/shop/ProductGrid"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

export function Favorites() {
  const { favorites } = useFavorites()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="heading-display heading-md">Favorites</h1>
          {favorites.length > 0 && (
            <p className="mt-2 text-foreground-muted">
              {favorites.length} {favorites.length === 1 ? "item" : "items"}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-6 p-4 rounded-full bg-background-secondary">
              <Heart className="h-12 w-12 text-foreground-muted" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No Favorites Yet</h2>
            <p className="text-foreground-muted mb-6 max-w-sm">
              Items added to your Favorites will be saved here.
            </p>
            <Link to="/shop">
              <Button size="lg">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <ProductGrid products={favorites} />
        )}
      </div>
    </div>
  )
}

