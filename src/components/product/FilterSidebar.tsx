"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { categories } from "@/data/categories";

export function FilterSidebar() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    categories: true,
    price: true,
    brands: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const brands = ["Oxford", "Pilot", "Stabilo", "Gallimard", "Faber-Castell", "Maped", "Casio", "Eastpak"];

  return (
    <div className="w-full space-y-6">
      {/* Categories Filter */}
      <div className="border-b border-line pb-6">
        <button 
          onClick={() => toggleSection('categories')}
          className="w-full flex items-center justify-between font-bold text-ink mb-4"
        >
          Catégories
          {openSections.categories ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        
        {openSections.categories && (
          <div className="space-y-3">
            {categories.map(cat => (
              <label key={cat.slug} className="flex items-center gap-3 cursor-pointer group">
                <div className="w-5 h-5 border border-line rounded flex items-center justify-center group-hover:border-cyan transition-colors">
                  {/* <Check className="w-3 h-3 text-white" /> */}
                </div>
                <span className="text-slate group-hover:text-ink transition-colors">{cat.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="border-b border-line pb-6">
        <button 
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between font-bold text-ink mb-4"
        >
          Prix (DA)
          {openSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        
        {openSections.price && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input type="number" placeholder="Min" className="w-full bg-surface border border-line rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan" />
              <span className="text-slate">-</span>
              <input type="number" placeholder="Max" className="w-full bg-surface border border-line rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan" />
            </div>
            <button className="w-full py-2 bg-ink-2 text-white rounded-lg text-sm hover:bg-cyan hover:text-ink transition-colors">
              Appliquer
            </button>
          </div>
        )}
      </div>

      {/* Brands Filter */}
      <div className="border-b border-line pb-6">
        <button 
          onClick={() => toggleSection('brands')}
          className="w-full flex items-center justify-between font-bold text-ink mb-4"
        >
          Marques
          {openSections.brands ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        
        {openSections.brands && (
          <div className="space-y-3 max-h-48 overflow-y-auto pr-2 no-scrollbar">
            {brands.map(brand => (
              <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                <div className="w-5 h-5 border border-line rounded flex items-center justify-center group-hover:border-cyan transition-colors"></div>
                <span className="text-slate group-hover:text-ink transition-colors">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Availability Filter */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="w-5 h-5 border border-line rounded flex items-center justify-center group-hover:border-cyan transition-colors"></div>
          <span className="text-slate group-hover:text-ink transition-colors font-medium">En stock uniquement</span>
        </label>
      </div>
    </div>
  );
}
