import { FilterSidebar } from "@/components/product/FilterSidebar";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getProducts } from "@/data/products";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

export const metadata = {
  title: "Boutique | Tous nos produits",
};

export default function ShopPage() {
  const products = getProducts();

  return (
    <div className="container-page py-8 md:py-12">
      {/* Page Header */}
      <div className="mb-8 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-ink mb-4">La Boutique</h1>
        <p className="text-slate text-lg max-w-2xl">
          Parcourez notre catalogue complet de livres, fournitures scolaires, papeterie et accessoires de bureau.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Mobile Filter Button */}
        <div className="lg:hidden flex items-center justify-between bg-surface p-4 rounded-xl">
          <span className="font-bold">{products.length} produits</span>
          <button className="flex items-center gap-2 font-semibold text-cyan-700">
            <SlidersHorizontal className="w-5 h-5" /> Filtrer
          </button>
        </div>

        {/* Sidebar (Desktop) */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <FilterSidebar />
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Bar (Desktop) */}
          <div className="hidden lg:flex items-center justify-between mb-8 pb-4 border-b border-line">
            <span className="font-bold text-ink">{products.length} produits</span>
            <div className="flex items-center gap-3">
              <span className="text-slate text-sm">Trier par :</span>
              <button className="flex items-center gap-2 font-semibold text-ink bg-surface px-4 py-2 rounded-lg hover:bg-line transition-colors">
                Pertinence <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Grid */}
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
