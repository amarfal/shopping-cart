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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold">Shop</h1>

      {loading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="mb-4 text-lg text-foreground-muted">{error}</p>
          <Button onClick={handleRetry}>Retry</Button>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <ProductGrid products={products} onProductClick={handleProductClick} />
      )}

      <ProductQuickViewDialog
        product={selectedProduct}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  )
}

