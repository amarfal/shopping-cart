import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getProducts } from "@/lib/api/products";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { Product } from "@/types";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_TERMS = ["Shoes", "Clothing", "Accessories"];

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const navigate = useNavigate();
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
    const lowerTerm = term.toLowerCase();
    // If it's a category, navigate to shop with filter
    if (["shoes", "clothing", "accessories"].includes(lowerTerm)) {
      onClose();
      navigate(`/shop?category=${lowerTerm}`);
      return;
    }
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
        <div className="flex items-center gap-2 sm:gap-4 px-4 sm:px-6 lg:px-12 h-14 sm:h-16 border-b border-border">
          {/* Logo area spacer */}
          <div className="hidden md:block w-32" />

          {/* Search Input */}
          <div className="flex-1 flex items-center gap-2 sm:gap-3 max-w-3xl mx-auto">
            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-foreground-muted shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="flex-1 bg-transparent text-base sm:text-lg font-medium placeholder:text-foreground-muted outline-hidden"
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearQuery}
                className="h-7 w-7 sm:h-8 sm:w-8 shrink-0"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            )}
          </div>

          {/* Cancel button */}
          <Button
            variant="link"
            onClick={onClose}
            className="text-sm sm:text-base font-semibold shrink-0 px-2"
          >
            Cancel
          </Button>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 lg:px-12 py-4 sm:py-8 max-h-[80vh] overflow-y-auto">
          {!query.trim() ? (
            // Empty state: Popular search terms
            <div className="max-w-4xl mx-auto">
              <p className="text-xs sm:text-sm text-foreground-muted mb-3 sm:mb-4 font-medium">
                Popular Search Terms
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {POPULAR_TERMS.map((term) => (
                  <Button
                    key={term}
                    variant="outline"
                    onClick={() => handleTermClick(term)}
                    className="capitalize text-xs sm:text-sm h-8 sm:h-10 px-3 sm:px-4"
                    size="sm"
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
                <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-4 sm:gap-8">
                  {/* Left: Suggestions */}
                  <div className="hidden md:block">
                    <p className="text-xs sm:text-sm text-foreground-muted mb-2 sm:mb-3 font-medium">
                      Top Suggestions
                    </p>
                    <ul className="space-y-1 sm:space-y-2">
                      {/* Query itself as first suggestion */}
                      <li>
                        <Button
                          variant="link"
                          onClick={() => handleTermClick(query)}
                          className="p-0 h-auto text-sm sm:text-base font-bold text-foreground"
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
                              className="p-0 h-auto text-sm sm:text-base font-medium text-foreground capitalize"
                            >
                              {category}
                            </Button>
                          </li>
                        ))}
                    </ul>
                  </div>

                  {/* Right: Product cards - exactly 5 */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                    {filteredProducts.slice(0, 5).map((product) => (
                      <Link
                        key={product.id}
                        to={`/shop/${product.id}`}
                        onClick={onClose}
                        className="group"
                      >
                        <div className="aspect-square bg-background-secondary rounded-lg overflow-hidden mb-1 sm:mb-2">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-xs sm:text-sm font-semibold line-clamp-2 mb-0.5 sm:mb-1 group-hover:text-foreground-muted transition-colors">
                          {product.title}
                        </h4>
                        <p className="text-[10px] sm:text-xs text-foreground-muted capitalize">
                          {product.category}
                        </p>
                        <p className="text-xs sm:text-sm font-semibold mt-0.5 sm:mt-1">
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
