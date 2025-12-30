import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { products } from "@/lib/data/products";

// Featured products for spotlight (mix of categories)
const SPOTLIGHT_PRODUCTS = [
  products[3], // Air Jordan 1 Mid
  products[0], // Air Max Pulse
  products[11], // Sportswear Club Tee
  products[2], // Dunk Low Retro
  products[4], // Air Force 1 '07
  products[20], // Brasilia Backpack
  products[1], // Pegasus 41
  products[6], // Blazer Mid '77
  products[14], // Tech Fleece Joggers
  products[21], // Heritage Cap
  products[10], // Tech Fleece Hoodie
  products[8], // Metcon 9
];

export function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Video Carousel */}
      <HeroCarousel />

      {/* Two Feature Cards - Full viewport height combined */}
      <section className="grid grid-cols-1 md:grid-cols-2 h-auto md:h-screen">
        {/* Card 1 */}
        <div className="group relative h-screen md:h-full overflow-hidden">
          <img
            src="/ad1.png"
            alt="Featured Collection 1"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

          {/* Content - Bottom left like Nike */}
          <div className="absolute bottom-12 left-8 text-white">
            <p className="text-sm font-semibold mb-1 opacity-80">Cleats</p>
            <h3 className="heading-display text-3xl md:text-4xl mb-4">
              CONQUER THE FIELD
            </h3>
            <Link to="/shop">
              <Button variant="inverse" size="sm">
                Shop
              </Button>
            </Link>
          </div>
        </div>

        {/* Card 2 */}
        <div className="group relative h-screen md:h-full overflow-hidden">
          <img
            src="/ad2.jpg"
            alt="Featured Collection 2"
            className="absolute inset-0 w-full h-full object-cover object-[40%_center] md:object-[25%_center]"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

          {/* Content - Bottom left like Nike */}
          <div className="absolute bottom-12 left-8 text-white">
            <p className="text-sm font-semibold mb-1 opacity-80">Jerseys</p>
            <h3 className="heading-display text-3xl md:text-4xl mb-4">
              BECOME YOUR HERO
            </h3>
            <Link to="/shop">
              <Button variant="inverse" size="sm">
                Shop
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Spotlight Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="heading-display text-4xl md:text-5xl mb-4">
            SPOTLIGHT
          </h2>
          <p className="text-foreground-muted max-w-2xl mx-auto mb-12">
            Classic silhouettes and cutting-edge innovation to build your game
            from the ground up.
          </p>

          {/* Product Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-6 gap-6 mb-12">
            {SPOTLIGHT_PRODUCTS.map((product) => (
              <Link
                key={product.id}
                to={`/shop/${product.id}`}
                className="group flex flex-col items-center"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-background-secondary overflow-hidden mb-2">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs sm:text-sm font-medium text-center line-clamp-2 group-hover:text-foreground-muted transition-colors">
                  {product.title}
                </span>
              </Link>
            ))}
          </div>

          {/* Logo */}
          <div className="mb-8">
            <img
              src="/sike-logo-removebg-preview.png"
              alt="Sike"
              className="h-20 w-20 mx-auto object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
