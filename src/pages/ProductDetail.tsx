import { useState, useEffect, useCallback } from "react"
import { useParams, Link } from "react-router-dom"
import type { Product } from "@/types"
import { getProductById } from "@/lib/api/products"
import { useCart } from "@/hooks/useCart"
import { useFavorites } from "@/hooks/useFavorites"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { AddedToBagDialog } from "@/components/shop/AddedToBagDialog"
import { cn } from "@/lib/utils"
import { Heart, ChevronLeft, Star, Truck, MapPin } from "lucide-react"

export function ProductDetail() {
  const { productId } = useParams<{ productId: string }>()
  const { addItem } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [showAddedDialog, setShowAddedDialog] = useState(false)

  useEffect(() => {
    let ignore = false

    async function fetchProduct() {
      if (!productId) return
      setLoading(true)
      const data = await getProductById(Number(productId))
      if (!ignore) {
        setProduct(data ?? null)
        setLoading(false)
      }
    }

    fetchProduct()
    return () => {
      ignore = true
    }
  }, [productId])

  const handleAddToBag = () => {
    if (!product || !selectedSize) return
    addItem(product)
    setShowAddedDialog(true)
  }

  const handleCloseDialog = useCallback(() => {
    setShowAddedDialog(false)
  }, [])

  const handleToggleFavorite = () => {
    if (product) toggleFavorite(product)
  }

  const isProductFavorite = product ? isFavorite(product.id) : false

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="w-16 h-16 rounded-lg" />
                ))}
              </div>
              <Skeleton className="flex-1 aspect-square rounded-lg" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-10 w-1/3" />
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 10 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 rounded-lg" />
                ))}
              </div>
              <Skeleton className="h-14 w-full" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-lg text-foreground-muted">Product not found</p>
        <Link to="/shop">
          <Button variant="outline">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Button>
        </Link>
      </div>
    )
  }

  const images = product.images ?? [product.image]
  const categoryLabel = product.category === "shoes" ? "Shoes" : product.category === "clothing" ? "Clothing" : "Accessories"

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-foreground-muted">
            <Link to="/shop" className="hover:text-foreground transition-colors">
              Shop
            </Link>
            <span>/</span>
            <Link 
              to={`/shop?category=${product.category}`}
              className="capitalize hover:text-foreground transition-colors"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left: Image Gallery */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="hidden sm:flex flex-col gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors",
                    selectedImage === i
                      ? "border-foreground"
                      : "border-transparent hover:border-foreground/30"
                  )}
                >
                  <img
                    src={img}
                    alt={`${product.title} view ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 aspect-square bg-background-secondary rounded-lg overflow-hidden">
              <img
                src={images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            {/* Category & Title */}
            <div>
              <p className="text-foreground-muted font-medium mb-1">
                {categoryLabel}
              </p>
              <h1 className="heading-display text-3xl md:text-4xl">
                {product.title}
              </h1>
            </div>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.round(product.rating!.rate)
                          ? "fill-foreground text-foreground"
                          : "text-foreground/20"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-foreground-muted">
                  ({product.rating.count} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <p className="text-2xl font-semibold">
              ${product.price.toFixed(2)}
            </p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">
                  Color: <span className="text-foreground-muted">{product.colors[0]}</span>
                </p>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="font-medium">Select Size</p>
                  <button className="text-sm text-foreground-muted hover:text-foreground underline">
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "py-3 px-2 text-sm font-medium rounded-lg border transition-colors",
                        selectedSize === size
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-foreground"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-3 pt-4">
              <Button
                size="lg"
                className="w-full h-14 text-base"
                onClick={handleAddToBag}
                disabled={!selectedSize}
              >
                {selectedSize ? "Add to Bag" : "Select a Size"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full h-14 text-base"
                onClick={handleToggleFavorite}
              >
                {isProductFavorite ? "Favorited" : "Favorite"}
                <Heart
                  className={cn(
                    "h-5 w-5 ml-2",
                    isProductFavorite && "fill-current"
                  )}
                />
              </Button>
            </div>

            {/* Shipping Info */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 mt-0.5 text-foreground-muted" />
                <div>
                  <p className="font-medium">Shipping</p>
                  <p className="text-sm text-foreground-muted">
                    You'll see our shipping options at checkout.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 text-foreground-muted" />
                <div>
                  <p className="font-medium">Free Pickup</p>
                  <p className="text-sm text-foreground-muted underline cursor-pointer">
                    Find a Store
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <p className="text-foreground-muted leading-relaxed">
              {product.description}
            </p>

            {/* Accordions */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="details">
                <AccordionTrigger>View Product Details</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-1 text-foreground-muted">
                    <li>Style: {product.id.toString().padStart(6, "0")}</li>
                    <li>Category: {categoryLabel}</li>
                    {product.colors && <li>Shown: {product.colors[0]}</li>}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                <AccordionContent>
                  <p className="text-foreground-muted">
                    Free standard shipping on orders over $50. Free returns within 60 days of purchase.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="reviews">
                <AccordionTrigger>
                  Reviews ({product.rating?.count ?? 0})
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < Math.round(product.rating?.rate ?? 0)
                              ? "fill-foreground text-foreground"
                              : "text-foreground/20"
                          )}
                        />
                      ))}
                    </div>
                    <span className="font-medium">{product.rating?.rate ?? 0} out of 5</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Added to Bag Dialog */}
      <AddedToBagDialog
        product={product}
        selectedSize={selectedSize}
        open={showAddedDialog}
        onClose={handleCloseDialog}
      />
    </div>
  )
}
