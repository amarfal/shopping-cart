import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { HeroCarousel } from "@/components/home/HeroCarousel"

export function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Video Carousel */}
      <HeroCarousel />

      {/* Two Feature Cards - Full viewport height combined */}
      <section className="grid grid-cols-1 md:grid-cols-2 h-auto md:h-[100vh]">
        {/* Card 1 */}
        <div className="group relative h-[100vh] md:h-full overflow-hidden">
          <img
            src="/ad1.png"
            alt="Featured Collection 1"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {/* Content - Bottom left like Nike */}
          <div className="absolute bottom-12 left-8 text-white">
            <p className="text-sm font-semibold mb-1 opacity-80">Cleats</p>
            <h3 className="heading-display text-3xl md:text-4xl mb-4">CONQUER THE FIELD</h3>
            <Link to="/shop">
              <Button 
                size="sm"
                className="bg-white text-black hover:bg-gray-200 rounded-full px-6 font-semibold"
              >
                Shop
              </Button>
            </Link>
          </div>
        </div>

        {/* Card 2 */}
        <div className="group relative h-[100vh] md:h-full overflow-hidden">
          <img
            src="/ad2.jpg"
            alt="Featured Collection 2"
            className="absolute inset-0 w-full h-full object-cover object-[25%_center]"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {/* Content - Bottom left like Nike */}
          <div className="absolute bottom-12 left-8 text-white">
            <p className="text-sm font-semibold mb-1 opacity-80">Jerseys</p>
            <h3 className="heading-display text-3xl md:text-4xl mb-4">BECOME YOUR HERO</h3>
            <Link to="/shop">
              <Button 
                size="sm"
                className="bg-white text-black hover:bg-gray-200 rounded-full px-6 font-semibold"
              >
                Shop
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Spotlight Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="heading-display text-4xl md:text-5xl mb-4">SPOTLIGHT</h2>
          <p className="text-foreground-muted max-w-2xl mx-auto mb-8">
            Classic silhouettes and cutting-edge innovation to build your game from the ground up.
          </p>
          <Link to="/shop">
            <Button size="lg" className="rounded-full px-8 font-semibold">Shop All</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
