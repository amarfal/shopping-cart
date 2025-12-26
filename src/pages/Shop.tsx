import { useState, useEffect } from "react"
import type { Product } from "@/types"
import { getProducts } from "@/lib/api/products"
import { ProductGrid } from "@/components/shop/ProductGrid"
import { ProductQuickViewDialog } from "@/components/shop/ProductQuickViewDialog"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

export function Shop() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    let ignore = false

    async function fetchData() {
      try {
        setLoading(true)
        setError(null)
        const data = await getProducts()
        if (!ignore) {
          setProducts(data)
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Failed to fetch products")
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    fetchData()
    return () => {
      ignore = true
    }
  }, [])

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setDialogOpen(true)
  }

  const handleRetry = () => {
    setProducts([])
    setLoading(true)
    setError(null)
    getProducts()
      .then(setProducts)
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to fetch products")
      )
      .finally(() => setLoading(false))
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="heading-display heading-md">All Products</h1>
          <p className="mt-2 text-foreground-muted">
            {!loading && !error && `${products.length} products`}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {loading && (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-24">
            <p className="mb-4 text-lg text-foreground-muted">{error}</p>
            <Button onClick={handleRetry}>Try Again</Button>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <ProductGrid products={products} onProductClick={handleProductClick} />
        )}
      </div>

      <ProductQuickViewDialog
        product={selectedProduct}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  )
}
