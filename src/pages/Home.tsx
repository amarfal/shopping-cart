import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function Home() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4">
      <div className="max-w-3xl text-center">
        <h1 className="mb-4 text-6xl font-bold tracking-tight sm:text-7xl">
          JUST DO IT
        </h1>
        <p className="mb-8 text-lg text-foreground-muted sm:text-xl">
          Discover the latest styles and innovations in athletic wear
        </p>
        <Link to="/shop">
          <Button size="lg" className="text-base">
            Shop Now
          </Button>
        </Link>
      </div>
    </div>
  )
}

