// ============================================================
// Category helper functions.
// ============================================================

import { categories } from "@/data/categories";
import type { CategoryNode } from "@/types";

/** Get all top-level category nodes. */
export function getAllCategories(): CategoryNode[] {
  return categories;
}

/** Find a category node by its slug at any depth. */
export function findCategoryNode(slug: string): CategoryNode | undefined {
  function search(nodes: CategoryNode[]): CategoryNode | undefined {
    for (const node of nodes) {
      if (node.slug === slug) return node;
      const found = search(node.children);
      if (found) return found;
    }
    return undefined;
  }
  return search(categories);
}

/**
 * Resolve a slug path array to the deepest matching node.
 * Returns the node at each level or undefined if path is invalid.
 */
export function resolveCategoryPath(
  slugs: string[]
): CategoryNode | undefined {
  let nodes = categories;
  let current: CategoryNode | undefined;

  for (const slug of slugs) {
    current = nodes.find((n) => n.slug === slug);
    if (!current) return undefined;
    nodes = current.children;
  }

  return current;
}

/**
 * Get an array of ancestor nodes (breadcrumb trail) for a slug path.
 * e.g. ["electronics", "audio", "headphones"] ->
 *   [Electronics node, Audio node, Headphones node]
 */
export function getCategoryBreadcrumbs(slugs: string[]): CategoryNode[] {
  const trail: CategoryNode[] = [];
  let nodes = categories;

  for (const slug of slugs) {
    const node = nodes.find((n) => n.slug === slug);
    if (!node) break;
    trail.push(node);
    nodes = node.children;
  }

  return trail;
}

/**
 * Generate all valid slug paths for generateStaticParams.
 * Returns paths including the empty root plus every valid slug combination.
 */
export function getAllCategoryPaths(): Array<{ slug: string[] | undefined }> {
  const paths: Array<{ slug: string[] | undefined }> = [
    { slug: undefined }, // /browse (root, optional catch-all)
  ];

  function collect(nodes: CategoryNode[], prefix: string[]): void {
    for (const node of nodes) {
      const path = [...prefix, node.slug];
      paths.push({ slug: path });
      collect(node.children, path);
    }
  }

  collect(categories, []);
  return paths;
}
