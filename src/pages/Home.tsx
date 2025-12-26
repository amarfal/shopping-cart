import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react"

export function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section with YouTube Video */}
      <section className="relative h-[100vh] overflow-hidden bg-black">
        {/* YouTube Video Background - 1080p quality */}
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/eGUor824a74?start=50&end=60&autoplay=1&mute=1&loop=1&playlist=eGUor824a74&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&vq=hd1080&hd=1"
            title="Hero Video"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] min-w-[177.78vh] min-h-[56.25vw] pointer-events-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          {/* Subtle overlay for text readability */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Hero Content - Centered */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
          <h1 className="heading-display text-[4rem] md:text-[6rem] lg:text-[8rem] mb-4 drop-shadow-lg tracking-tight">
            FROM ANYWHERE
          </h1>
          <p className="text-base md:text-lg max-w-xl mb-8 text-white/90">
            Greatness can come from anywhere, just like Caitlin Clark did.
          </p>
          <div className="flex items-center gap-3">
            <Link to="/shop">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-gray-100 rounded-full px-8 font-medium"
              >
                Shop
              </Button>
            </Link>
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-gray-100 rounded-full px-6 font-medium"
            >
              <Play className="h-4 w-4 mr-1 fill-current" />
              Watch
            </Button>
          </div>
        </div>

        {/* Carousel Controls - Nike style */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          <div className="w-2 h-2 rounded-full bg-white" />
          <div className="w-2 h-2 rounded-full bg-white/40" />
          <div className="w-2 h-2 rounded-full bg-white/40" />
        </div>

        {/* Video controls - Nike style */}
        <div className="absolute bottom-8 right-8 flex items-center gap-2 z-10">
          <button className="w-12 h-12 rounded-full bg-gray-800/80 flex items-center justify-center hover:bg-gray-700/80 transition-colors">
            <Pause className="h-5 w-5 text-white fill-white" />
          </button>
          <button className="w-12 h-12 rounded-full bg-gray-800/80 flex items-center justify-center hover:bg-gray-700/80 transition-colors">
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>
          <button className="w-12 h-12 rounded-full bg-gray-800/80 flex items-center justify-center hover:bg-gray-700/80 transition-colors">
            <ChevronRight className="h-5 w-5 text-white" />
          </button>
        </div>
      </section>

      {/* Two Feature Cards - Full viewport height combined */}
      <section className="grid grid-cols-1 md:grid-cols-2 h-auto md:h-[100vh]">
        {/* Card 1 */}
        <div className="group relative h-[100vh] md:h-full overflow-hidden">
          <img
            src="/ad1.png"
            alt="Featured Collection 1"
            className="absolute inset-0 w-full h-full object-cover smooth-transition group-hover:scale-102"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {/* Content - Bottom left like Nike */}
          <div className="absolute bottom-12 left-8 text-white">
            <p className="text-sm font-medium mb-1 opacity-80">New Year</p>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Conquer the Court</h3>
            <Link to="/shop">
              <Button 
                size="sm"
                className="bg-white text-black hover:bg-gray-100 rounded-full px-6 font-medium"
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
            className="absolute inset-0 w-full h-full object-cover smooth-transition group-hover:scale-102"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {/* Content - Bottom left like Nike */}
          <div className="absolute bottom-12 left-8 text-white">
            <p className="text-sm font-medium mb-1 opacity-80">Sike Tech Fleece</p>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Armor Made for City Movement</h3>
            <Link to="/shop">
              <Button 
                size="sm"
                className="bg-white text-black hover:bg-gray-100 rounded-full px-6 font-medium"
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
          <h2 className="heading-display heading-md mb-4">SPOTLIGHT</h2>
          <p className="text-foreground-muted max-w-2xl mx-auto mb-8">
            Classic silhouettes and cutting-edge innovation to build your game from the ground up.
          </p>
          <Link to="/shop">
            <Button size="lg" className="rounded-full px-8">Shop All</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
