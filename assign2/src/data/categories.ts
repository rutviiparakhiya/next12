// ============================================================
// Taxonomy data — the category tree for the store.
// This is a simple JavaScript tree; no database needed.
// Each node has children for subcategories.
// ============================================================

import type { CategoryNode } from "@/types";

export const categories: CategoryNode[] = [
  {
    slug: "electronics",
    name: "Electronics",
    description:
      "Engineered hardware modules across computing, precise acoustic transducers, and functional peripheral work surfaces.",
    itemCount: 14,
    children: [
      {
        slug: "audio",
        name: "Audio",
        description: "Precision acoustic transducers and portable sound devices.",
        itemCount: 4,
        children: [
          {
            slug: "headphones",
            name: "Headphones",
            description:
              "Acoustic transducers and portable head-worn sound reproduction devices categorised under audio engineering. Covering all catalog items matching this taxonomy branch.",
            itemCount: 4,
            children: [
              { slug: "over-ear", name: "Over-Ear", description: "Over-ear headphones", itemCount: 1, children: [] },
              { slug: "on-ear", name: "On-Ear", description: "On-ear headphones", itemCount: 1, children: [] },
              { slug: "in-ear-monitors", name: "In-Ear Monitors", description: "In-ear monitors", itemCount: 1, children: [] },
              { slug: "wireless-anc", name: "Wireless ANC", description: "Active noise cancelling wireless", itemCount: 1, children: [] },
            ],
          },
          {
            slug: "speakers",
            name: "Speakers",
            description: "Desktop and portable speakers.",
            itemCount: 2,
            children: [],
          },
        ],
      },
      {
        slug: "computing",
        name: "Computing",
        description: "Laptops, desktops, and computing accessories.",
        itemCount: 3,
        children: [],
      },
      {
        slug: "peripherals",
        name: "Peripherals",
        description: "Keyboards, mice, and input devices.",
        itemCount: 4,
        children: [],
      },
      {
        slug: "accessories",
        name: "Accessories",
        description: "Stands, hubs, cables, and desk accessories.",
        itemCount: 3,
        children: [],
      },
    ],
  },
  {
    slug: "home-office",
    name: "Home & Office",
    description:
      "Ergonomic, timber and aluminium workspace setups, uniform optical illumination fixtures, and storage organisations.",
    itemCount: 10,
    children: [
      {
        slug: "furniture",
        name: "Furniture",
        description: "Desks, chairs, and shelving.",
        itemCount: 3,
        children: [],
      },
      {
        slug: "lighting",
        name: "Lighting",
        description: "Desk and ambient lighting solutions.",
        itemCount: 2,
        children: [],
      },
      {
        slug: "kitchenware",
        name: "Kitchenware",
        description: "Pour-over drippers, kettles, and brewing accessories.",
        itemCount: 3,
        children: [],
      },
      {
        slug: "organization",
        name: "Organization",
        description: "Trays, boxes, and workspace organisers.",
        itemCount: 2,
        children: [],
      },
    ],
  },
  {
    slug: "apparel",
    name: "Apparel",
    description:
      "Minimalist weatherproof shells, unbleached natural heavyweight cotton staples, and technical merino canvas.",
    itemCount: 8,
    children: [
      {
        slug: "essentials",
        name: "Essentials",
        description: "Everyday basics and staple items.",
        itemCount: 2,
        children: [],
      },
      {
        slug: "headwear",
        name: "Headwear",
        description: "Beanies, caps, and hats.",
        itemCount: 2,
        children: [],
      },
      {
        slug: "bags",
        name: "Bags",
        description: "Tote bags, backpacks, and carry accessories.",
        itemCount: 2,
        children: [],
      },
      {
        slug: "outerwear",
        name: "Outerwear",
        description: "Jackets, coats, and outer layers.",
        itemCount: 2,
        children: [],
      },
    ],
  },
  {
    slug: "accessories",
    name: "Accessories",
    description:
      "Vegetable-tanned folio sleeves, grid-lined technical notebooks, and high-density desk blotters.",
    itemCount: 6,
    children: [
      {
        slug: "leather-goods",
        name: "Leather Goods",
        description: "Wallets, sleeves, and leather accessories.",
        itemCount: 2,
        children: [],
      },
      {
        slug: "stationery",
        name: "Stationery",
        description: "Notebooks, pens, and desk stationery.",
        itemCount: 2,
        children: [],
      },
      {
        slug: "desk-mats",
        name: "Desk Mats",
        description: "Leather and rubber desk mats.",
        itemCount: 2,
        children: [],
      },
    ],
  },
];
