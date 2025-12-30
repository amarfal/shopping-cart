import type { Product } from "@/types"

const SHOE_SIZES = ["M 6", "M 6.5", "M 7", "M 7.5", "M 8", "M 8.5", "M 9", "M 9.5", "M 10", "M 10.5", "M 11", "M 11.5", "M 12", "M 13"]
const CLOTHING_SIZES = ["XS", "S", "M", "L", "XL", "XXL"]
const ACCESSORY_SIZES = ["One Size"]

export const products: Product[] = [
  // ==================== SHOES (10) ====================
  {
    id: 1,
    title: "Air Max Pulse",
    price: 149.99,
    description: "The Air Max Pulse brings a bold new attitude to the Air Max lineage. Inspired by the London music scene, this shoe features a textile-wrapped midsole and point-loaded Air cushioning for unreal comfort.",
    category: "shoes",
    subcategory: "Lifestyle",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80"
    ],
    sizes: SHOE_SIZES,
    colors: ["Black/White", "University Red", "Pure Platinum"],
    rating: { rate: 4.8, count: 423 }
  },
  {
    id: 2,
    title: "Pegasus 41",
    price: 139.99,
    description: "A springy ride for any run, the Pegasus 41 offers responsive cushioning that's perfect for everyday training. React X foam and Zoom Air deliver a snappy feel underfoot.",
    category: "shoes",
    subcategory: "Running",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80"
    ],
    sizes: SHOE_SIZES,
    colors: ["Black/Volt", "White/Blue", "Grey/Orange"],
    rating: { rate: 4.7, count: 891 }
  },
  {
    id: 3,
    title: "Dunk Low Retro",
    price: 115.00,
    description: "Created for the hardwood but taken to the streets, the Dunk Low Retro returns with crisp overlays and classic team colors. Padded collar for support.",
    category: "shoes",
    subcategory: "Basketball",
    image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&q=80",
      "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=800&q=80"
    ],
    sizes: SHOE_SIZES,
    colors: ["Panda", "Grey Fog", "Team Red"],
    rating: { rate: 4.9, count: 1247 }
  },
  {
    id: 4,
    title: "Air Jordan 1 Mid",
    price: 125.00,
    description: "The Air Jordan 1 Mid is the fresh take on an icon. With premium materials and Air-Sole cushioning, this shoe delivers on both style and comfort.",
    category: "shoes",
    subcategory: "Basketball",
    image: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80"
    ],
    sizes: SHOE_SIZES,
    colors: ["Chicago", "Shadow", "Royal Blue"],
    rating: { rate: 4.8, count: 2156 }
  },
  {
    id: 5,
    title: "Air Force 1 '07",
    price: 115.00,
    description: "The radiance lives on in the Air Force 1 '07. Crossing hardwood comfort with off-court flair, this iconic sneaker features soft leather and timeless style.",
    category: "shoes",
    subcategory: "Lifestyle",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&q=80"
    ],
    sizes: SHOE_SIZES,
    colors: ["Triple White", "Black/White", "Wheat"],
    rating: { rate: 4.9, count: 3421 }
  },
  {
    id: 6,
    title: "Zoom Vomero 18",
    price: 159.99,
    description: "Maximum cushioning for the long haul. The Vomero 18 features stacked ZoomX foam with a rocker geometry that propels you through your run.",
    category: "shoes",
    subcategory: "Running",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
    ],
    sizes: SHOE_SIZES,
    colors: ["White/Platinum", "Black/Anthracite", "Blue/Green"],
    rating: { rate: 4.6, count: 567 }
  },
  {
    id: 7,
    title: "Blazer Mid '77 Vintage",
    price: 105.00,
    description: "The Blazer Mid '77 Vintage harnesses the old-school look of Nike basketball with its suede and leather construction and classic styling.",
    category: "shoes",
    subcategory: "Lifestyle",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80"
    ],
    sizes: SHOE_SIZES,
    colors: ["White/Black", "Sail/Orange", "White/Green"],
    rating: { rate: 4.7, count: 892 }
  },
  {
    id: 8,
    title: "React Infinity Run 4",
    price: 169.99,
    description: "Built to help reduce injury, the React Infinity Run 4 provides a smooth, stable ride. Nike React foam cushions your stride for miles.",
    category: "shoes",
    subcategory: "Running",
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
    ],
    sizes: SHOE_SIZES,
    colors: ["Black/White", "Pure Platinum", "Volt"],
    rating: { rate: 4.5, count: 445 }
  },
  {
    id: 9,
    title: "Metcon 9",
    price: 149.99,
    description: "The Metcon 9 is the gold standard for training. Updated with firmer foam for stability, it's perfect for lifting, sprints, and high-intensity workouts.",
    category: "shoes",
    subcategory: "Training & Gym",
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80"
    ],
    sizes: SHOE_SIZES,
    colors: ["Black/Iron Grey", "White/Volt", "Team Red"],
    rating: { rate: 4.8, count: 678 }
  },
  {
    id: 10,
    title: "Free Run 5.0",
    price: 109.99,
    description: "Flexible and lightweight, the Free Run 5.0 provides a barefoot-like feel with its flexible sole and breathable upper. Perfect for natural movement.",
    category: "shoes",
    subcategory: "Running",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
    ],
    sizes: SHOE_SIZES,
    colors: ["Black/White", "Wolf Grey", "University Blue"],
    rating: { rate: 4.6, count: 523 }
  },

  // ==================== CLOTHING (10) ====================
  {
    id: 11,
    title: "Tech Fleece Hoodie",
    price: 125.00,
    description: "Warmth without the weight. The Tech Fleece Hoodie combines a tailored, athletic fit with lightweight insulation for all-day comfort.",
    category: "clothing",
    subcategory: "Hoodies & Sweatshirts",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
      "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&q=80"
    ],
    sizes: CLOTHING_SIZES,
    colors: ["Black Heather", "Dark Grey", "Midnight Navy"],
    rating: { rate: 4.8, count: 1892 }
  },
  {
    id: 12,
    title: "Sportswear Club Tee",
    price: 35.00,
    description: "Classic comfort meets streetwear style. The Club Tee features soft cotton fabric and a relaxed fit for everyday wear.",
    category: "clothing",
    subcategory: "Tops & Graphic Tees",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80"
    ],
    sizes: CLOTHING_SIZES,
    colors: ["White", "Black", "Grey Heather", "Navy"],
    rating: { rate: 4.7, count: 2341 }
  },
  {
    id: 13,
    title: "Dri-FIT Training Shorts",
    price: 45.00,
    description: "Stay dry and comfortable during intense workouts. Dri-FIT technology wicks sweat away while the lightweight design keeps you moving freely.",
    category: "clothing",
    subcategory: "Shorts",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80",
      "https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?w=800&q=80"
    ],
    sizes: CLOTHING_SIZES,
    colors: ["Black", "Game Royal", "University Red"],
    rating: { rate: 4.6, count: 987 }
  },
  {
    id: 14,
    title: "Windrunner Jacket",
    price: 110.00,
    description: "A heritage design with modern function. The Windrunner Jacket features water-repellent fabric and the iconic chevron design.",
    category: "clothing",
    subcategory: "Outerwear",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80"
    ],
    sizes: CLOTHING_SIZES,
    colors: ["Black/White", "Midnight Navy", "Olive/Black"],
    rating: { rate: 4.7, count: 756 }
  },
  {
    id: 15,
    title: "Tech Fleece Joggers",
    price: 115.00,
    description: "Premium Tech Fleece joggers with a tapered fit. Zippered pockets and a comfortable waistband make these perfect for training or relaxing.",
    category: "clothing",
    subcategory: "Sweatpants",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80"
    ],
    sizes: CLOTHING_SIZES,
    colors: ["Black", "Dark Grey Heather", "Light Bone"],
    rating: { rate: 4.8, count: 1567 }
  },
  {
    id: 16,
    title: "Pro Compression Top",
    price: 55.00,
    description: "Train harder with body-hugging support. The Pro Compression Top features Dri-FIT fabric and a streamlined fit for peak performance.",
    category: "clothing",
    subcategory: "Tops & Graphic Tees",
    image: "https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?w=800&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"
    ],
    sizes: CLOTHING_SIZES,
    colors: ["Black", "White", "Game Royal"],
    rating: { rate: 4.5, count: 432 }
  },
  {
    id: 17,
    title: "Essential Fleece Crew",
    price: 65.00,
    description: "Soft brushed fleece for premium comfort. This crewneck sweatshirt features a relaxed fit and embroidered branding.",
    category: "clothing",
    subcategory: "Hoodies & Sweatshirts",
    image: "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&q=80",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80"
    ],
    sizes: CLOTHING_SIZES,
    colors: ["Black", "Light Bone", "Sail"],
    rating: { rate: 4.7, count: 654 }
  },
  {
    id: 18,
    title: "Basketball Jersey",
    price: 75.00,
    description: "Game-ready style with breathable mesh construction. This jersey features a relaxed fit and moisture-wicking technology.",
    category: "clothing",
    subcategory: "Tops & Graphic Tees",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800&q=80"
    ],
    sizes: CLOTHING_SIZES,
    colors: ["White/Black", "Black/Red", "Royal/Gold"],
    rating: { rate: 4.6, count: 289 }
  },
  {
    id: 19,
    title: "Running Tank Top",
    price: 40.00,
    description: "Lightweight and breathable for your runs. The mesh back panel provides ventilation while Dri-FIT keeps you dry.",
    category: "clothing",
    subcategory: "Tops & Graphic Tees",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"
    ],
    sizes: CLOTHING_SIZES,
    colors: ["Black", "White", "Volt"],
    rating: { rate: 4.5, count: 378 }
  },
  {
    id: 20,
    title: "Therma-FIT Pullover",
    price: 85.00,
    description: "Warmth when you need it. Therma-FIT technology traps body heat while remaining lightweight and breathable.",
    category: "clothing",
    subcategory: "Outerwear",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80"
    ],
    sizes: CLOTHING_SIZES,
    colors: ["Black", "Dark Grey", "Midnight Navy"],
    rating: { rate: 4.7, count: 512 }
  },

  // ==================== ACCESSORIES (10) ====================
  {
    id: 21,
    title: "Brasilia Training Backpack",
    price: 55.00,
    description: "Durable storage for all your training essentials. Features padded shoulder straps, multiple compartments, and a laptop sleeve.",
    category: "accessories",
    subcategory: "Bags & Backpacks",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80"
    ],
    sizes: ACCESSORY_SIZES,
    colors: ["Black", "University Red", "Game Royal"],
    rating: { rate: 4.8, count: 1234 }
  },
  {
    id: 22,
    title: "Sportswear Heritage Cap",
    price: 28.00,
    description: "Classic 6-panel cap with embroidered logo. Adjustable back strap for a custom fit.",
    category: "accessories",
    subcategory: "Hats & Headwear",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&q=80"
    ],
    sizes: ACCESSORY_SIZES,
    colors: ["Black", "White", "Navy"],
    rating: { rate: 4.6, count: 876 }
  },
  {
    id: 23,
    title: "Everyday Cushioned Crew Socks (3 Pack)",
    price: 22.00,
    description: "Soft cotton blend with cushioned footbed for all-day comfort. Arch support and breathable mesh zones.",
    category: "accessories",
    subcategory: "Socks",
    image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800&q=80",
      "https://images.unsplash.com/photo-1631006254870-51ab7d07b9d0?w=800&q=80"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Grey"],
    rating: { rate: 4.7, count: 2543 }
  },
  {
    id: 24,
    title: "Elemental Premium Duffle Bag",
    price: 65.00,
    description: "Versatile training bag with separate shoe compartment. Adjustable shoulder strap and padded handles.",
    category: "accessories",
    subcategory: "Bags & Backpacks",
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
    ],
    sizes: ACCESSORY_SIZES,
    colors: ["Black", "Iron Grey", "Midnight Navy"],
    rating: { rate: 4.7, count: 567 }
  },
  {
    id: 25,
    title: "Swoosh Headband",
    price: 15.00,
    description: "Absorbent headband for intense workouts. Dri-FIT fabric wicks away sweat to keep you focused.",
    category: "accessories",
    subcategory: "Hats & Headwear",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80"
    ],
    sizes: ACCESSORY_SIZES,
    colors: ["Black", "White", "University Red"],
    rating: { rate: 4.5, count: 432 }
  },
  {
    id: 26,
    title: "Training Gloves",
    price: 35.00,
    description: "Enhanced grip and palm protection for lifting. Padded design with breathable mesh back.",
    category: "accessories",
    subcategory: "Bags & Backpacks",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black/Volt", "Black/White", "Grey"],
    rating: { rate: 4.4, count: 234 }
  },
  {
    id: 27,
    title: "Heritage Crossbody Bag",
    price: 38.00,
    description: "Compact crossbody for essentials on the go. Adjustable strap and multiple pockets for organization.",
    category: "accessories",
    subcategory: "Bags & Backpacks",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
    ],
    sizes: ACCESSORY_SIZES,
    colors: ["Black", "Light Bone", "Midnight Navy"],
    rating: { rate: 4.6, count: 389 }
  },
  {
    id: 28,
    title: "Pro Wristbands (2 Pack)",
    price: 12.00,
    description: "Soft terry cloth wristbands for sweat absorption. Stretchy fabric for comfortable fit.",
    category: "accessories",
    subcategory: "Hats & Headwear",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"
    ],
    sizes: ACCESSORY_SIZES,
    colors: ["White", "Black", "University Red"],
    rating: { rate: 4.5, count: 567 }
  },
  {
    id: 29,
    title: "Pro Elite Sunglasses",
    price: 189.00,
    description: "Lightweight performance sunglasses with anti-fog lenses. Perfect for running and outdoor training.",
    category: "accessories",
    subcategory: "Hats & Headwear",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80"
    ],
    sizes: ACCESSORY_SIZES,
    colors: ["Matte Black", "White/Grey", "Volt"],
    rating: { rate: 4.7, count: 178 }
  },
  {
    id: 30,
    title: "Hyperwarm Beanie",
    price: 32.00,
    description: "Stay warm during cold weather training. Therma-FIT technology traps heat while remaining lightweight.",
    category: "accessories",
    subcategory: "Hats & Headwear",
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&q=80",
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80"
    ],
    sizes: ACCESSORY_SIZES,
    colors: ["Black", "Dark Grey", "Navy"],
    rating: { rate: 4.6, count: 345 }
  }
]

// Category menu structure for Shop dropdown
export const SHOP_MENU = {
  shoes: {
    label: "Shoes",
    subcategories: ["All Shoes", "Basketball", "Football", "Lifestyle", "Running", "Soccer", "Training & Gym"]
  },
  clothing: {
    label: "Clothing",
    subcategories: ["All Clothing", "Hoodies & Sweatshirts", "Outerwear", "Pants", "Shorts", "Sweatpants", "Tops & Graphic Tees"]
  },
  accessories: {
    label: "Accessories",
    subcategories: ["All Accessories", "Bags & Backpacks", "Hats & Headwear", "Socks"]
  }
}
