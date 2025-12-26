import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CartProvider } from "@/providers/CartProvider"
import { Navbar } from "@/components/layout/Navbar"
import { Home } from "@/pages/Home"
import { Shop } from "@/pages/Shop"
import { Cart } from "@/pages/Cart"

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background text-foreground antialiased">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
