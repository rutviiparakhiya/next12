// ============================================================
// Product dummy data for PlainShop.
// 8 featured products appear on /products.
// 3 extra non-featured headphone products appear only in
// /browse/electronics/audio/headphones.
// Every product can be viewed at /products/[slug].
// ============================================================

import type { Product } from "@/types";

export const products: Product[] = [
  // ---- FEATURED PRODUCTS (appear on /products listing) ----

  {
    id: 1,
    slug: "wireless-headphones",
    sku: "AUD-01",
    name: "Wireless Headphones",
    brand: "SonicCraft",
    price: 149,
    categorySlug: "electronics",
    subcategorySlug: "audio",
    leafSlug: "headphones",
    categoryLabel: "Electronics / Audio",
    description:
      "High-fidelity closed-back wireless headphones engineered with precision 40mm dynamic drivers, low-latency Bluetooth 5.3 connection, and 38-hour battery longevity. Designed for distraction-free listening and long work sessions.",
    rating: 4.8,
    stockStatus: "In Stock",
    stockUnits: 24,
    featured: true,
    image: "/products/wireless-headphones.jpg",
    gallery: [
      "/products/wireless-headphones-front.jpg",
      "/products/wireless-headphones-folded.jpg",
      "/products/wireless-headphones-profile.jpg",
    ],
    specs: [
      { label: "Chassis Transducer", value: "40mm Dynamic Neodymium" },
      { label: "Total Net Mass", value: "242 g (8.53 oz)" },
      { label: "Frequency Response", value: "15 Hz – 24,000 Hz" },
      { label: "Passive Attenuation", value: "-22 dB @ 1 kHz" },
    ],
    options: [
      {
        key: "color",
        label: "Finish / Color",
        choices: [
          { id: "matte-slate", label: "Matte Slate", priceDelta: 0 },
          { id: "chalk-white", label: "Chalk White", priceDelta: 0 },
          { id: "midnight-navy", label: "Midnight Navy", priceDelta: 0 },
        ],
      },
      {
        key: "connectivity",
        label: "Connectivity Architecture",
        choices: [
          { id: "std-bt53", label: "Standard Wireless", priceDelta: 0 },
          { id: "studio-dac", label: "Studio Wireless + DAC", priceDelta: 40 },
        ],
      },
      {
        key: "cushion",
        label: "Ear Cushion Acoustic Seal",
        choices: [
          { id: "mem-foam", label: "Memory Foam", priceDelta: 0 },
          { id: "cool-gel", label: "Cooling Gel", priceDelta: 15 },
        ],
      },
    ],
  },

  {
    id: 2,
    slug: "mechanical-keyboard",
    sku: "PER-02",
    name: "Mechanical Keyboard",
    brand: "Keychronix",
    price: 119,
    categorySlug: "electronics",
    subcategorySlug: "peripherals",
    leafSlug: "peripherals",
    categoryLabel: "Electronics / Peripherals",
    description:
      "Compact tenkeyless mechanical keyboard with hot-swappable switches, per-key RGB backlighting, and an aircraft-grade aluminium top case. Built for long typing sessions and precision input.",
    rating: 4.6,
    stockStatus: "In Stock",
    stockUnits: 18,
    featured: true,
    image: "/products/mechanical-keyboard.jpg",
    gallery: [
      "/products/mechanical-keyboard-top.jpg",
      "/products/mechanical-keyboard-side.jpg",
      "/products/mechanical-keyboard-detail.jpg",
    ],
    specs: [
      { label: "Switch Type", value: "Hot-Swappable 5-Pin" },
      { label: "Layout", value: "Tenkeyless (87-key)" },
      { label: "Case Material", value: "Aircraft-grade Aluminium" },
    ],
    options: [
      {
        key: "switch",
        label: "Switch Variant",
        choices: [
          { id: "linear", label: "Linear (Red)", priceDelta: 0 },
          { id: "tactile", label: "Tactile (Brown)", priceDelta: 0 },
          { id: "clicky", label: "Clicky (Blue)", priceDelta: 0 },
        ],
      },
      {
        key: "color",
        label: "Case Finish",
        choices: [
          { id: "space-grey", label: "Space Grey", priceDelta: 0 },
          { id: "silver", label: "Silver", priceDelta: 10 },
        ],
      },
    ],
  },

  {
    id: 3,
    slug: "minimal-desk-lamp",
    sku: "LGT-03",
    name: "Minimal Desk Lamp",
    brand: "Lumina Studio",
    price: 68,
    categorySlug: "home-office",
    subcategorySlug: "lighting",
    leafSlug: "lighting",
    categoryLabel: "Home & Office / Lighting",
    description:
      "Single-arm minimalist LED desk lamp with 5-stage colour temperature control, wireless charging base pad, and memory function that recalls your last brightness setting.",
    rating: 4.5,
    stockStatus: "In Stock",
    stockUnits: 31,
    featured: true,
    image: "/products/minimal-desk-lamp.jpg",
    gallery: [
      "/products/minimal-desk-lamp-on.jpg",
      "/products/minimal-desk-lamp-side.jpg",
      "/products/minimal-desk-lamp-base.jpg",
    ],
    specs: [
      { label: "Light Source", value: "LED 12W" },
      { label: "Colour Temperature", value: "2700K – 6500K" },
      { label: "Base Material", value: "Matte Steel" },
    ],
    options: [
      {
        key: "color",
        label: "Body Colour",
        choices: [
          { id: "matte-black", label: "Matte Black", priceDelta: 0 },
          { id: "chalk-white", label: "Chalk White", priceDelta: 0 },
        ],
      },
      {
        key: "arm",
        label: "Arm Style",
        choices: [
          { id: "single", label: "Single Arm", priceDelta: 0 },
          { id: "double", label: "Double Arm", priceDelta: 20 },
        ],
      },
    ],
  },

  {
    id: 4,
    slug: "ceramic-pour-over-dripper",
    sku: "KIT-04",
    name: "Ceramic Pour-Over Dripper",
    brand: "Kinto Form",
    price: 34,
    categorySlug: "home-office",
    subcategorySlug: "kitchenware",
    leafSlug: "kitchenware",
    categoryLabel: "Home & Office / Kitchenware",
    description:
      "Single-cup ceramic pour-over dripper with a ribbed interior for consistent, even extraction. Designed for V60-compatible paper filters. Dishwasher safe.",
    rating: 4.7,
    stockStatus: "In Stock",
    stockUnits: 45,
    featured: true,
    image: "/products/ceramic-pour-over-dripper.jpg",
    gallery: [
      "/products/pour-over-top.jpg",
      "/products/pour-over-side.jpg",
      "/products/pour-over-base.jpg",
    ],
    specs: [
      { label: "Material", value: "Glazed Ceramic" },
      { label: "Capacity", value: "1 cup (approx. 300ml)" },
      { label: "Filter Compatibility", value: "V60 Size 01 / 02" },
    ],
    options: [
      {
        key: "color",
        label: "Glaze Colour",
        choices: [
          { id: "off-white", label: "Off White", priceDelta: 0 },
          { id: "matte-grey", label: "Matte Grey", priceDelta: 0 },
          { id: "sage", label: "Sage Green", priceDelta: 4 },
        ],
      },
      {
        key: "bundle",
        label: "Bundle",
        choices: [
          { id: "dripper-only", label: "Dripper Only", priceDelta: 0 },
          { id: "with-carafe", label: "With Carafe", priceDelta: 22 },
        ],
      },
    ],
  },

  {
    id: 5,
    slug: "cotton-canvas-tote",
    sku: "BAG-05",
    name: "Cotton Canvas Tote",
    brand: "Norr Goods",
    price: 42,
    categorySlug: "apparel",
    subcategorySlug: "bags",
    leafSlug: "bags",
    categoryLabel: "Apparel / Bags",
    description:
      "Unbleached heavyweight 12oz cotton canvas tote with reinforced drop handles, an interior zip pocket, and a natural beeswax base coating for light moisture resistance.",
    rating: 4.4,
    stockStatus: "In Stock",
    stockUnits: 52,
    featured: true,
    image: "/products/cotton-canvas-tote.jpg",
    gallery: [
      "/products/tote-front.jpg",
      "/products/tote-interior.jpg",
      "/products/tote-base.jpg",
    ],
    specs: [
      { label: "Fabric Weight", value: "12 oz Cotton Canvas" },
      { label: "Dimensions", value: "38 × 42 × 10 cm" },
      { label: "Handle Drop", value: "28 cm" },
    ],
    options: [
      {
        key: "color",
        label: "Canvas Colour",
        choices: [
          { id: "natural", label: "Natural", priceDelta: 0 },
          { id: "black", label: "Black", priceDelta: 0 },
        ],
      },
      {
        key: "size",
        label: "Size",
        choices: [
          { id: "standard", label: "Standard", priceDelta: 0 },
          { id: "large", label: "Large", priceDelta: 8 },
        ],
      },
    ],
  },

  {
    id: 6,
    slug: "merino-wool-beanie",
    sku: "APP-06",
    name: "Merino Wool Beanie",
    brand: "Nordic Thread",
    price: 38,
    categorySlug: "apparel",
    subcategorySlug: "headwear",
    leafSlug: "headwear",
    categoryLabel: "Apparel / Headwear",
    description:
      "Ribbed 100% merino wool beanie with a fold-over cuff and minimal branding. Naturally temperature-regulating and odour-resistant for all-day wear.",
    rating: 4.6,
    stockStatus: "In Stock",
    stockUnits: 38,
    featured: true,
    image: "/products/merino-wool-beanie.jpg",
    gallery: [
      "/products/beanie-front.jpg",
      "/products/beanie-side.jpg",
      "/products/beanie-cuff.jpg",
    ],
    specs: [
      { label: "Material", value: "100% Merino Wool" },
      { label: "Knit", value: "2x2 Rib" },
      { label: "Cuff Style", value: "Fold-over" },
    ],
    options: [
      {
        key: "color",
        label: "Colour",
        choices: [
          { id: "charcoal", label: "Charcoal", priceDelta: 0 },
          { id: "oat", label: "Oat", priceDelta: 0 },
          { id: "navy", label: "Navy", priceDelta: 0 },
        ],
      },
      {
        key: "weight",
        label: "Knit Weight",
        choices: [
          { id: "mid", label: "Mid Weight", priceDelta: 0 },
          { id: "heavy", label: "Heavy Weight", priceDelta: 6 },
        ],
      },
    ],
  },

  {
    id: 7,
    slug: "anodized-aluminum-stand",
    sku: "ACC-07",
    name: "Anodized Aluminum Stand",
    brand: "CraftDesk",
    price: 54,
    categorySlug: "electronics",
    subcategorySlug: "accessories",
    leafSlug: "accessories",
    categoryLabel: "Electronics / Accessories",
    description:
      "Precision-machined anodized aluminium laptop and tablet stand with 6-angle adjustment, passive heat-dissipation fins, and anti-slip silicone feet. Compatible with 11–16" devices.",
    rating: 4.5,
    stockStatus: "In Stock",
    stockUnits: 20,
    featured: true,
    image: "/products/anodized-aluminum-stand.jpg",
    gallery: [
      "/products/stand-front.jpg",
      "/products/stand-side.jpg",
      "/products/stand-folded.jpg",
    ],
    specs: [
      { label: "Material", value: "6061 Aluminium Alloy" },
      { label: "Angle Range", value: "15° – 60°" },
      { label: "Weight Capacity", value: "5 kg" },
    ],
    options: [
      {
        key: "finish",
        label: "Anodize Finish",
        choices: [
          { id: "silver", label: "Silver", priceDelta: 0 },
          { id: "space-grey", label: "Space Grey", priceDelta: 0 },
          { id: "gold", label: "Gold", priceDelta: 8 },
        ],
      },
      {
        key: "size",
        label: "Size Variant",
        choices: [
          { id: "standard", label: "Standard (up to 15\")", priceDelta: 0 },
          { id: "pro", label: "Pro (up to 17\")", priceDelta: 15 },
        ],
      },
    ],
  },

  {
    id: 8,
    slug: "leather-notebook-sleeve",
    sku: "STA-08",
    name: "Leather Notebook Sleeve",
    brand: "Haptic Press",
    price: 48,
    categorySlug: "accessories",
    subcategorySlug: "stationery",
    leafSlug: "stationery",
    categoryLabel: "Accessories / Stationery",
    description:
      "Vegetable-tanned full-grain leather notebook sleeve with a snap closure and interior card slot. Fits standard A5 notebooks. Develops a rich patina with use.",
    rating: 4.7,
    stockStatus: "In Stock",
    stockUnits: 15,
    featured: true,
    image: "/products/leather-notebook-sleeve.jpg",
    gallery: [
      "/products/sleeve-front.jpg",
      "/products/sleeve-open.jpg",
      "/products/sleeve-card.jpg",
    ],
    specs: [
      { label: "Leather", value: "Full-Grain Veg-Tan" },
      { label: "Fits Notebook", value: "A5 (148 × 210 mm)" },
      { label: "Closure", value: "Brass Snap" },
    ],
    options: [
      {
        key: "color",
        label: "Leather Colour",
        choices: [
          { id: "tan", label: "Natural Tan", priceDelta: 0 },
          { id: "dark-brown", label: "Dark Brown", priceDelta: 0 },
          { id: "black", label: "Black", priceDelta: 0 },
        ],
      },
      {
        key: "notebook",
        label: "Notebook Bundle",
        choices: [
          { id: "sleeve-only", label: "Sleeve Only", priceDelta: 0 },
          { id: "with-notebook", label: "With A5 Notebook", priceDelta: 18 },
        ],
      },
    ],
  },

  // ---- NON-FEATURED HEADPHONE PRODUCTS ----
  // These appear in /browse/electronics/audio/headphones but NOT on /products

  {
    id: 9,
    slug: "open-back-studio-monitors",
    sku: "AUD-09",
    name: "Open-Back Studio Monitors",
    brand: "SonicCraft",
    price: 199,
    categorySlug: "electronics",
    subcategorySlug: "audio",
    leafSlug: "headphones",
    categoryLabel: "Electronics / Audio",
    description:
      "Reference-grade open-back headphones tuned for mixing and mastering environments. Wide soundstage, ultra-low harmonic distortion, and a detachable balanced cable.",
    rating: 4.9,
    stockStatus: "In Stock",
    stockUnits: 8,
    featured: false,
    image: "/products/open-back-studio-monitors.jpg",
    gallery: [
      "/products/open-back-front.jpg",
      "/products/open-back-side.jpg",
      "/products/open-back-cable.jpg",
    ],
    specs: [
      { label: "Driver", value: "50mm Planar-Assist" },
      { label: "Impedance", value: "150 Ω" },
      { label: "THD", value: "< 0.05% @ 100dBSPL" },
    ],
    options: [
      {
        key: "cable",
        label: "Cable Termination",
        choices: [
          { id: "3.5mm", label: "3.5mm TRS", priceDelta: 0 },
          { id: "balanced", label: "4.4mm Balanced", priceDelta: 20 },
        ],
      },
      {
        key: "pad",
        label: "Ear Pad Material",
        choices: [
          { id: "velour", label: "Velour", priceDelta: 0 },
          { id: "leather", label: "Leather", priceDelta: 12 },
        ],
      },
    ],
  },

  {
    id: 10,
    slug: "true-wireless-earbuds",
    sku: "AUD-10",
    name: "True Wireless Earbuds",
    brand: "SonicCraft",
    price: 89,
    categorySlug: "electronics",
    subcategorySlug: "audio",
    leafSlug: "headphones",
    categoryLabel: "Electronics / Audio",
    description:
      "Compact true-wireless earbuds with hybrid active noise cancellation, 8-hour playback plus 24-hour case, and dual-beam forming microphones for clear calls.",
    rating: 4.3,
    stockStatus: "In Stock",
    stockUnits: 33,
    featured: false,
    image: "/products/true-wireless-earbuds.jpg",
    gallery: [
      "/products/earbuds-case.jpg",
      "/products/earbuds-open.jpg",
      "/products/earbuds-worn.jpg",
    ],
    specs: [
      { label: "Driver", value: "10mm Dynamic" },
      { label: "Battery", value: "8h + 24h case" },
      { label: "ANC", value: "Hybrid Feedforward/Feedback" },
    ],
    options: [
      {
        key: "color",
        label: "Case Colour",
        choices: [
          { id: "white", label: "Pearl White", priceDelta: 0 },
          { id: "black", label: "Matte Black", priceDelta: 0 },
        ],
      },
      {
        key: "tip",
        label: "Ear Tip Material",
        choices: [
          { id: "silicone", label: "Silicone", priceDelta: 0 },
          { id: "foam", label: "Memory Foam", priceDelta: 5 },
        ],
      },
    ],
  },

  {
    id: 11,
    slug: "planar-magnetic-cans",
    sku: "AUD-11",
    name: "Planar Magnetic Cans",
    brand: "AudioPhonic",
    price: 229,
    categorySlug: "electronics",
    subcategorySlug: "audio",
    leafSlug: "headphones",
    categoryLabel: "Electronics / Audio",
    description:
      "High-end planar magnetic headphones with ultra-thin diaphragm and neodymium magnet arrays. Exceptional transient response and sub-bass extension for audiophile listening.",
    rating: 4.8,
    stockStatus: "Low Stock",
    stockUnits: 3,
    featured: false,
    image: "/products/planar-magnetic-cans.jpg",
    gallery: [
      "/products/planar-front.jpg",
      "/products/planar-side.jpg",
      "/products/planar-detail.jpg",
    ],
    specs: [
      { label: "Driver Type", value: "Planar Magnetic" },
      { label: "Sensitivity", value: "96 dB/mW" },
      { label: "Impedance", value: "32 Ω" },
    ],
    options: [
      {
        key: "finish",
        label: "Frame Finish",
        choices: [
          { id: "rosewood", label: "Rosewood", priceDelta: 0 },
          { id: "walnut", label: "Walnut", priceDelta: 15 },
        ],
      },
      {
        key: "cable",
        label: "Cable Length",
        choices: [
          { id: "1.5m", label: "1.5m Standard", priceDelta: 0 },
          { id: "3m", label: "3m Studio Length", priceDelta: 8 },
        ],
      },
    ],
  },
];
