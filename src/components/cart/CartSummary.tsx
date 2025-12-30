import { useCart } from "@/hooks/useCart"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from "@/lib/constants"

export function CartSummary() {
  const { subtotal, total, totalItemCount } = useCart()
  
  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)
  const amountToFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0)
  const hasFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD

  return (
    <div className="rounded-2xl border border-border bg-background p-6">
      <h2 className="text-xl font-bold mb-6">Summary</h2>

      {/* Promo Code Accordion */}
      <Accordion type="single" collapsible className="border-b border-border mb-4">
        <AccordionItem value="promo" className="border-none">
          <AccordionTrigger className="py-3 text-sm hover:no-underline">
            Do you have a Promo Code?
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex gap-2 pb-4">
              <Input placeholder="Enter code" className="flex-1" />
              <Button variant="outline">Apply</Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-foreground-muted">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-foreground-muted">Estimated Shipping & Handling</span>
          <span className={cn("font-medium", hasFreeShipping && "text-green-600")}>
            {hasFreeShipping ? "Free" : `$${SHIPPING_COST.toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-foreground-muted">Estimated Tax</span>
          <span className="font-medium">—</span>
        </div>

        <div className="border-t border-border pt-4 mt-4">
          <div className="flex justify-between text-base">
            <span className="font-bold">Total</span>
            <span className="font-bold">${(hasFreeShipping ? total : total + SHIPPING_COST).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Free Shipping Progress */}
      {totalItemCount > 0 && (
        <div className="mt-6 p-4 bg-background-secondary rounded-lg">
          {hasFreeShipping ? (
            <p className="text-sm text-green-600 font-medium">
              You qualify for Free Shipping as a Member!{" "}
              <span className="underline cursor-pointer">Join us</span> or{" "}
              <span className="underline cursor-pointer">Sign-in</span>
            </p>
          ) : (
            <div>
              <p className="text-sm text-foreground-muted mb-2">
                You're <span className="font-semibold text-foreground">${amountToFreeShipping.toFixed(2)}</span> away from free shipping!
              </p>
              <div className="relative h-2 bg-border rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-green-500 rounded-full transition-all duration-300"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
              <div className="flex justify-end mt-1">
                <span className="text-xs text-foreground-muted">${FREE_SHIPPING_THRESHOLD}</span>
              </div>
            </div>
          )}
        </div>
      )}

      <Button
        size="lg"
        className="mt-6 w-full"
        disabled
      >
        Checkout
      </Button>
      
      <p className="mt-4 text-center text-xs text-foreground-muted">
        By selecting one of the above payment options, you confirm that you have read, understand, and agree to our Terms of Use.
      </p>
    </div>
  )
}
