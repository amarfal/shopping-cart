# Architecture Overview

> **Sike Shopping Cart** — Nike-inspired e-commerce experience built with Vite + React 19.2

## Tech Stack

- **Frontend:** React 19.2 + TypeScript
- **Routing:** React Router DOM 7.11
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **State:** Context API + useReducer
- **Build:** Vite 7
- **API:** FakeStore API (REST)
- **Persistence:** localStorage

---

## Application Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                            │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                    React Application                       │ │
│  │                                                            │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │ │
│  │  │  Home Page   │  │  Shop Page   │  │  Cart Page   │   │ │
│  │  │              │  │              │  │              │   │ │
│  │  │ HeroCarousel │  │ ProductGrid  │  │  CartList    │   │ │
│  │  │ FeatureCards │  │ QuickView    │  │  CartSummary │   │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘   │ │
│  │                                                            │ │
│  │  ┌────────────────────────────────────────────────────┐  │ │
│  │  │              Global Components                      │  │ │
│  │  │  • Navbar (with live cart count)                   │  │ │
│  │  │  • SearchOverlay (real-time product search)        │  │ │
│  │  └────────────────────────────────────────────────────┘  │ │
│  │                                                            │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
           │                          │                  │
           │                          │                  │
           ▼                          ▼                  ▼
    ┌──────────┐              ┌─────────────┐    ┌──────────────┐
    │ Context  │              │   API Layer │    │ localStorage │
    │ Provider │              │             │    │              │
    │          │              │ products.ts │    │ cart storage │
    │ useCart()│              └─────────────┘    └──────────────┘
    └──────────┘                     │
         │                           │
         │                           ▼
         │                  ┌─────────────────┐
         │                  │  FakeStore API  │
         │                  │                 │
         │                  │ fakestoreapi.com│
         │                  └─────────────────┘
         │
         ▼
    ┌──────────────────────────────────────────┐
    │         Cart State Management            │
    │                                          │
    │  • cartReducer (useReducer)              │
    │  • cartSelectors (derived state)         │
    │  • localStorage sync (auto-persist)      │
    └──────────────────────────────────────────┘
```

---

## Data Flow Architecture

### 1. Product Data Flow (Read-Only)

```
┌─────────────┐
│ Shop Page   │
│ or          │
│ SearchOverlay│
└──────┬──────┘
       │
       │ calls getProducts()
       │
       ▼
┌─────────────────────────────────┐
│  src/lib/api/products.ts        │
│                                 │
│  • In-memory cache check        │
│  • If cached → return           │
│  • If not → fetch from API      │
└────────┬────────────────────────┘
         │
         │ HTTP GET
         │
         ▼
┌──────────────────────────────────┐
│  FakeStore API                   │
│  https://fakestoreapi.com        │
│                                  │
│  GET /products                   │
│  → Returns Product[]             │
└────────┬─────────────────────────┘
         │
         │ JSON Response
         │
         ▼
┌──────────────────────────────────┐
│  Cache + Return to Component     │
│                                  │
│  cachedProducts = data           │
│  → Prevents redundant API calls  │
└──────────────────────────────────┘
```

**Key Points:**

- **Single API call** per session (cached in memory)
- **No refetching** on navigation
- **Fast subsequent loads** from cache

---

### 2. Cart State Flow (Write + Persist)

```
┌──────────────────────────────────────────────────────────────┐
│                    User Interaction                          │
│  • Click "Add to Bag" (ProductQuickViewDialog)               │
│  • Click +/- (CartItemRow)                                   │
│  • Click Remove (CartItemRow)                                │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     │ dispatch(action)
                     │
                     ▼
┌──────────────────────────────────────────────────────────────┐
│              CartProvider (Context + useReducer)             │
│                                                              │
│  const [items, dispatch] = useReducer(cartReducer, [], ...  │
│                                                              │
│  Actions:                                                    │
│  • ADD_ITEM       → Add product (qty: 1)                    │
│  • INCREMENT_ITEM → +1 (max: 10)                            │
│  • DECREMENT_ITEM → -1 (remove if 0)                        │
│  • REMOVE_ITEM    → Delete from cart                        │
│  • CLEAR_CART     → Empty cart                              │
│  • HYDRATE_CART   → Load from localStorage                  │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     │ new state
                     │
                     ▼
┌──────────────────────────────────────────────────────────────┐
│                  cartReducer.ts                              │
│                                                              │
│  • Immutable state updates                                   │
│  • Business logic (max qty, remove at 0)                     │
│  • Returns new CartItem[]                                    │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     │ items updated
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
┌──────────────────┐    ┌──────────────────────┐
│  useEffect       │    │  Derived State       │
│  Auto-Sync       │    │  (cartSelectors.ts)  │
│                  │    │                      │
│  saveCart(items) │    │  • totalItemCount    │
│  → localStorage  │    │  • subtotal          │
└──────────────────┘    │  • total             │
                        └──────────────────────┘
                                 │
                                 │ consumed by
                                 │
                                 ▼
                        ┌──────────────────────┐
                        │  UI Components       │
                        │                      │
                        │  • Navbar (badge)    │
                        │  • CartSummary       │
                        │  • CartList          │
                        └──────────────────────┘
```

**Key Points:**

- **Single source of truth** (CartProvider)
- **Automatic persistence** (useEffect → localStorage)
- **Derived state** calculated on-demand (no redundant state)
- **Max quantity enforced** (10 per item)

---

### 3. localStorage Persistence Flow

```
┌─────────────────────────────────────────────────────────┐
│                   App Initialization                     │
│                                                          │
│  1. CartProvider mounts                                  │
│  2. useReducer initializer runs                          │
│     → loadCart() called                                  │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│              localStorage.getItem("sike-cart")           │
│                                                          │
│  • If exists → parse JSON → hydrate state                │
│  • If not   → return []                                  │
│  • If error → return [] (graceful fallback)              │
└────────────────────┬─────────────────────────────────────┘
                     │
                     │ CartItem[]
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│                Cart State Hydrated                       │
│                                                          │
│  User sees their cart from previous session              │
└──────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────┐
│               Any Cart State Change                      │
│                                                          │
│  useEffect(() => { saveCart(items) }, [items])           │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│           localStorage.setItem("sike-cart", ...)         │
│                                                          │
│  • Stringify CartItem[]                                  │
│  • Save to browser storage                               │
│  • Persists across page refreshes                        │
└──────────────────────────────────────────────────────────┘
```

**Key Points:**

- **Automatic sync** on every cart change
- **Survives page refresh** and browser restart
- **Graceful error handling** (empty cart on parse error)

---

## Component Hierarchy

```
App.tsx
├── CartProvider (Context)
│   └── Router
│       ├── Navbar
│       │   ├── SearchOverlay (modal)
│       │   │   └── Product preview cards
│       │   └── Cart badge (live count)
│       │
│       ├── Home (/)
│       │   ├── HeroCarousel
│       │   │   └── YouTube video slides
│       │   └── Feature cards
│       │
│       ├── Shop (/shop)
│       │   ├── ProductGrid
│       │   │   └── ProductCard (×N)
│       │   └── ProductQuickViewDialog (modal)
│       │       └── Add to Bag button
│       │
│       └── Cart (/cart)
│           ├── CartList
│           │   └── CartItemRow (×N)
│           │       └── Quantity controls
│           └── CartSummary
│               └── Checkout button (UI only)
```

---

## API Integration Details

### FakeStore API

**Base URL:** `https://fakestoreapi.com`

#### Endpoint Used

```
GET /products
```

**Response Schema:**

```typescript
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
```

**Implementation:**

```typescript
// src/lib/api/products.ts

const API_URL = "https://fakestoreapi.com/products";
let cachedProducts: Product[] | null = null;

export async function getProducts() {
  if (cachedProducts) return cachedProducts;
  cachedProducts = await fetchProducts();
  return cachedProducts;
}
```

**Usage Pattern:**

1. **Shop Page:** Loads all products on mount
2. **SearchOverlay:** Filters cached products client-side
3. **No pagination:** All 20 products loaded at once
4. **No authentication:** Public API, no keys required

---

## State Management Strategy

### Cart State (useReducer)

**Why useReducer over useState?**

- Complex state logic (add/increment/decrement/remove)
- Predictable state transitions
- Easier to test and debug
- Scales better for additional actions

**Reducer Actions:**

```typescript
type CartAction =
  | { type: "ADD_ITEM"; product: Product }
  | { type: "INCREMENT_ITEM"; productId: number }
  | { type: "DECREMENT_ITEM"; productId: number }
  | { type: "REMOVE_ITEM"; productId: number }
  | { type: "CLEAR_CART" }
  | { type: "HYDRATE_CART"; items: CartItem[] };
```

### Derived State (Selectors)

**Calculated on-demand, not stored:**

```typescript
// src/lib/cart/cartSelectors.ts

export const getTotalItemCount = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.quantity, 0);

export const getSubtotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

export const getTotal = (items: CartItem[]) => getSubtotal(items); // No tax/shipping in demo
```

**Benefits:**

- Always in sync with cart items
- No redundant state
- No useEffect chains

---

## Performance Optimizations

### 1. API Caching

- In-memory cache prevents redundant fetches
- Single API call per session
- Instant subsequent page loads

### 2. Client-Side Search

- SearchOverlay filters cached products
- No API calls during search
- Real-time filtering

### 3. Derived State

- Calculations done during render
- No extra re-renders from state updates
- useMemo not needed (calculations are cheap)

### 4. localStorage Sync

- Debounced via useEffect dependency
- Only writes when items actually change
- Graceful error handling

---

## Error Handling

### API Errors

```typescript
try {
  const products = await getProducts();
  setProducts(products);
} catch (error) {
  console.error("Failed to load products:", error);
  // Show error UI with retry button
}
```

### localStorage Errors

```typescript
export function loadCart() {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return []; // Graceful fallback
  }
}
```

### Race Conditions

```typescript
useEffect(() => {
  let ignore = false;

  fetchProducts().then((data) => {
    if (!ignore) setProducts(data);
  });

  return () => {
    ignore = true;
  };
}, []);
```

---

## Key Design Decisions

### 1. No Backend

- FakeStore API provides product data
- No authentication/authorization
- localStorage for cart persistence
- No real checkout/payment

### 2. Single Page Application

- React Router for client-side routing
- No server-side rendering
- Fast navigation (no full page reloads)

### 3. Context + useReducer

- Global cart state without Redux
- Simpler setup for small app
- Easy to test and maintain

### 4. shadcn/ui Components

- Copy-paste components (not npm package)
- Full control over styling
- Tailwind CSS integration
- Consistent Nike-inspired design

### 5. Client-Side Search

- No search API needed
- Instant results
- Filters title, category, description

---

## Future Enhancements

### Potential Improvements

- [ ] Add product filtering (by category, price)
- [ ] Add sorting (price, rating, name)
- [ ] Add pagination for large product lists
- [ ] Add product reviews/ratings display
- [ ] Add wishlist functionality
- [ ] Add order history (mock)
- [ ] Add animations with Framer Motion
- [ ] Add unit tests (Vitest + React Testing Library)
- [ ] Add E2E tests (Playwright)

### Scalability Considerations

- **Real Backend:** Replace FakeStore with custom API
- **State Management:** Migrate to TanStack Query for server state
- **Authentication:** Add user accounts with JWT
- **Payment:** Integrate Stripe/PayPal
- **Database:** Store cart server-side
- **CDN:** Host images on Cloudinary/S3

---

## File Structure Reference

```
src/
├── pages/              # Route components
│   ├── Home.tsx
│   ├── Shop.tsx
│   └── Cart.tsx
├── components/
│   ├── layout/         # Global components
│   │   ├── Navbar.tsx
│   │   └── SearchOverlay.tsx
│   ├── home/           # Home page components
│   │   └── HeroCarousel.tsx
│   ├── shop/           # Shop page components
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   └── ProductQuickViewDialog.tsx
│   ├── cart/           # Cart page components
│   │   ├── CartItemRow.tsx
│   │   ├── CartList.tsx
│   │   └── CartSummary.tsx
│   └── ui/             # shadcn components
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── badge.tsx
│       └── ...
├── providers/          # Context providers
│   └── CartProvider.tsx
├── lib/
│   ├── api/            # API integration
│   │   └── products.ts
│   ├── cart/           # Cart logic
│   │   ├── cartReducer.ts
│   │   ├── cartSelectors.ts
│   │   └── localStorage.ts
│   └── utils.ts        # Utility functions
├── types/              # TypeScript types
│   └── index.ts
├── App.tsx             # Root component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

---

**Last Updated:** December 28, 2025  
**Version:** 1.0.0  
**React:** 19.2.0  
**Vite:** 7.2.4
