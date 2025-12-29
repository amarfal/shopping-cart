import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { getProducts } from "@/lib/api/products";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { Product } from "@/types";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_TERMS = [
  "electronics",
  "jewelry",
  "clothing",
  "watches",
  "bags",
  "accessories",
];

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load products on mount
  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (!isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  // Filter products when query changes
  useEffect(() => {
    if (!query.trim()) {
      setFilteredProducts([]);
      return;
    }

    const lowerQuery = query.toLowerCase();

    // Filter products
    const matches = products.filter(
      (p) =>
        p.title.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
    );
    setFilteredProducts(matches);
  }, [query, products]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleTermClick = (term: string) => {
    setQuery(term);
    inputRef.current?.focus();
  };

  const clearQuery = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-60 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Overlay Panel */}
      <div className="fixed top-0 left-0 right-0 bg-background z-70 shadow-xl animate-in slide-in-from-top duration-300">
        {/* Header with search */}
        <div className="flex items-center gap-4 px-6 sm:px-8 lg:px-12 h-16 border-b border-border">
          {/* Logo area spacer */}
          <div className="hidden md:block w-32" />

          {/* Search Input */}
          <div className="flex-1 flex items-center gap-3 max-w-3xl mx-auto">
            <Search className="h-5 w-5 text-foreground-muted shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="flex-1 bg-transparent text-lg font-medium placeholder:text-foreground-muted outline-none"
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearQuery}
                className="h-8 w-8"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Cancel button */}
          <Button
            variant="link"
            onClick={onClose}
            className="text-base font-semibold"
          >
            Cancel
          </Button>
        </div>

        {/* Content */}
        <div className="px-6 sm:px-8 lg:px-12 py-8 max-h-[80vh] overflow-y-auto">
          {!query.trim() ? (
            // Empty state: Popular search terms
            <div className="max-w-4xl mx-auto">
              <p className="text-sm text-foreground-muted mb-4 font-medium">
                Popular Search Terms
              </p>
              <div className="flex flex-wrap gap-3">
                {POPULAR_TERMS.map((term) => (
                  <Button
                    key={term}
                    variant="outline"
                    onClick={() => handleTermClick(term)}
                    className="capitalize"
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            // Search results
            <div className="max-w-6xl mx-auto">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Spinner className="w-8 h-8" />
                </div>
              ) : filteredProducts.length === 0 ? (
                <p className="text-center text-foreground-muted py-12">
                  No results found for "{query}"
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
                  {/* Left: Suggestions */}
                  <div>
                    <p className="text-sm text-foreground-muted mb-3 font-medium">
                      Top Suggestions
                    </p>
                    <ul className="space-y-2">
                      {/* Query itself as first suggestion */}
                      <li>
                        <Button
                          variant="link"
                          onClick={() => handleTermClick(query)}
                          className="p-0 h-auto text-base font-bold text-foreground"
                        >
                          {query}
                        </Button>
                      </li>
                      {/* Unique categories from results */}
                      {Array.from(
                        new Set(filteredProducts.map((p) => p.category))
                      )
                        .slice(0, 4)
                        .map((category) => (
                          <li key={category}>
                            <Button
                              variant="link"
                              onClick={() => handleTermClick(category)}
                              className="p-0 h-auto text-base font-medium text-foreground capitalize"
                            >
                              {category}
                            </Button>
                          </li>
                        ))}
                    </ul>
                  </div>

                  {/* Right: Product cards - exactly 5 */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {filteredProducts.slice(0, 5).map((product) => (
                      <Link
                        key={product.id}
                        to="/shop"
                        onClick={onClose}
                        className="group"
                      >
                        <div className="aspect-square bg-background-secondary rounded-lg overflow-hidden mb-2">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-contain p-4"
                          />
                        </div>
                        <h4 className="text-sm font-semibold line-clamp-2 mb-1 group-hover:text-foreground-muted transition-colors">
                          {product.title}
                        </h4>
                        <p className="text-xs text-foreground-muted capitalize">
                          {product.category}
                        </p>
                        <p className="text-sm font-semibold mt-1">
                          ${product.price.toFixed(2)}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
