# Sike - Nike-Style Shopping Cart

A modern e-commerce shopping cart experience inspired by Nike.com, built with React 19, TypeScript, and Tailwind CSS. :D

## ✨ Features

- **Product Catalog** - Browse products from FakeStore API with beautiful product cards
- **Quick View** - Click any product to see details in a modal overlay
- **Smart Cart** - Add items to bag with quantity management (max 10 per item)
- **Live Cart Badge** - Real-time item count in navbar
- **Persistent Cart** - Cart state saved to localStorage
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- **Modern UX** - Smooth transitions, hover effects, and premium feel

## 🚀 Tech Stack

- **Vite 7** - Lightning-fast build tool
- **React 19.2** - Latest React with modern hooks
- **TypeScript** - Type-safe development
- **React Router 7.11** - Client-side routing
- **Tailwind CSS v4** - Utility-first styling
- **shadcn/ui** - Beautiful component library
- **FakeStore API** - Product data source

## 📦 Installation

```bash
npm install
```

## 🛠️ Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view in browser.

## 🏗️ Build

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── pages/              # Route pages (Home, Shop, Cart)
├── components/
│   ├── layout/         # Navbar
│   ├── shop/           # Product grid, cards, quick view
│   ├── cart/           # Cart list, item rows, summary
│   └── ui/             # shadcn/ui components
├── providers/          # CartProvider with useReducer
├── lib/
│   ├── api/            # FakeStore API integration
│   ├── cart/           # Cart reducer, selectors, localStorage
│   └── utils.ts        # Utility functions
└── types/              # TypeScript interfaces
```

## 🎨 Design Principles

- **Nike-Inspired** - Clean, bold, modern aesthetic
- **Dark Theme** - Dark grey background with white text
- **Light Blue Accent** - Primary actions and hover states
- **Whitespace** - Generous spacing for clean layout
- **Premium Feel** - Smooth animations and quality interactions

## 🛒 Cart Features

- Add items from product quick view
- Increment/decrement quantities in cart
- Maximum 10 items per product
- Remove items individually
- Persistent across page refresh
- Real-time subtotal and total calculations

## 🔄 State Management

- **useReducer** for cart state (predictable updates)
- **Context API** for global cart access
- **localStorage** for persistence
- **Derived state** for totals (no unnecessary re-renders)

## 📝 API

Products fetched from [FakeStore API](https://fakestoreapi.com/):

- Simple in-memory caching
- Error handling with retry option
- Loading states with skeletons

## 🎯 Key Learning Points

- React 19 modern patterns
- Type-safe TypeScript
- useReducer for complex state
- Custom hooks and providers
- Responsive design with Tailwind
- Component composition
- Performance optimization

## 📄 License

MIT

## 🙏 Credits

- Design inspiration: Nike.com
- Product data: [FakeStore API](https://fakestoreapi.com/)
- UI components: [shadcn/ui](https://ui.shadcn.com/)
