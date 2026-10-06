"use client";

import { useCartStore } from "@/store/useCartStore";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/types";

export function AddToCartButton({ product, disabled }: { product: Product, disabled?: boolean }) {
  const addItem = useCartStore(state => state.addItem);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    // fallback if sonner is not setup yet
    if (typeof window !== 'undefined' && !(window as unknown as { toast: unknown }).toast) {
       console.log('Added to cart');
    }
  };

  return (
    <button 
      onClick={handleAdd}
      className="p-3 bg-ink-2 text-white rounded-xl hover:bg-cyan hover:text-ink transition-colors disabled:opacity-50"
      disabled={disabled}
    >
      <ShoppingCart className="w-5 h-5" />
    </button>
  );
}
