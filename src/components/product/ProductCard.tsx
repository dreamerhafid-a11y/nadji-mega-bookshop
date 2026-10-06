import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import type { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "./AddToCartButton";

export function ProductCard({ product }: { product: Product }) {
  const isDiscounted = product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <div className="group flex flex-col bg-white border border-line rounded-2xl overflow-hidden hover:border-cyan hover:shadow-card transition-all duration-300">
      {/* Image Area */}
      <div className="relative aspect-square bg-surface p-4 flex items-center justify-center">
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.isNew && <Badge className="bg-cyan text-ink hover:bg-cyan-600 border-none">Nouveau</Badge>}
          {isDiscounted && <Badge className="bg-orange text-white hover:bg-orange-600 border-none">Promo</Badge>}
          {product.stock === 0 && <Badge variant="secondary">Rupture</Badge>}
        </div>

        {/* Favorite Button */}
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm text-muted-ink hover:text-cyan transition-colors z-10 opacity-0 group-hover:opacity-100 focus:opacity-100">
          <Heart className="w-4 h-4" />
        </button>

        <Link href={`/produit/${product.slug}`} className="relative w-full h-full flex items-center justify-center">
          <Image
            src={product.images[0] || "/placeholder.jpg"}
            alt={product.name}
            width={300}
            height={300}
            className="object-contain max-h-[80%] transition-transform duration-500 group-hover:scale-110 mix-blend-multiply"
          />
        </Link>
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/produit/${product.slug}`} className="block flex-1">
          <p className="text-xs text-muted-ink mb-1">{product.brand || product.author}</p>
          <h3 className="font-semibold text-ink leading-tight line-clamp-2 group-hover:text-cyan transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="mt-4 flex items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-ink">{product.price} DA</span>
            </div>
            {isDiscounted && (
              <span className="text-sm text-muted-ink line-through">{product.compareAtPrice} DA</span>
            )}
          </div>
          <AddToCartButton product={product} disabled={product.stock === 0} />
        </div>
      </div>
    </div>
  );
}
