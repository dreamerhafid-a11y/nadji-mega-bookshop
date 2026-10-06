"use client";

import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/types";

export function AddToCartFullButton({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const addItem = useCartStore(state => state.addItem);

  const isOutOfStock = product.stock === 0;

  return (
    <>
      {/* Qty Selector */}
      <div className="flex items-center border border-line rounded-xl bg-surface h-14">
        <button 
          onClick={() => setQty(Math.max(1, qty - 1))}
          className="w-12 h-full flex items-center justify-center text-ink hover:bg-line transition-colors rounded-l-xl text-xl font-medium"
        >-</button>
        <input 
          type="number" 
          value={qty} 
          readOnly 
          className="w-16 h-full bg-transparent text-center font-bold text-ink focus:outline-none" 
        />
        <button 
          onClick={() => setQty(Math.min(product.stock, qty + 1))}
          className="w-12 h-full flex items-center justify-center text-ink hover:bg-line transition-colors rounded-r-xl text-xl font-medium"
        >+</button>
      </div>
      
      <button 
        onClick={() => addItem(product, qty)}
        className="flex-1 h-14 bg-cyan text-ink font-bold text-lg rounded-xl hover:bg-cyan-600 transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50" 
        disabled={isOutOfStock}
      >
        <ShoppingCart className="w-5 h-5" /> Ajouter au panier
      </button>
    </>
  );
}
