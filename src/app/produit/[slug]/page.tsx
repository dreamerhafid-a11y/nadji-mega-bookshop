import { getProductBySlug, getProducts } from "@/data/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Star, Truck, ShieldCheck, Heart } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { AddToCartFullButton } from "@/components/product/AddToCartFullButton";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);
  if (!product) return {};
  return { title: `${product.name} | Nadji Mega Bookstore` };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }


  return (
    <div className="bg-surface min-h-screen pb-20">
      <div className="container-page pt-8 pb-4">
        <nav className="flex text-sm text-slate">
          <Link href="/" className="hover:text-cyan transition-colors">Accueil</Link>
          <span className="mx-2">/</span>
          <Link href={`/${product.category}`} className="hover:text-cyan transition-colors capitalize">{product.category.replace('-', ' ')}</Link>
          <span className="mx-2">/</span>
          <span className="text-ink font-medium truncate">{product.name}</span>
        </nav>
      </div>

      <div className="container-page">
        <div className="bg-white rounded-3xl p-6 lg:p-12 border border-line shadow-sm flex flex-col lg:flex-row gap-12 items-start mb-16">
          
          <div className="w-full lg:w-1/2 sticky top-24">
            <div className="relative aspect-square rounded-2xl bg-surface border border-line flex items-center justify-center overflow-hidden group">
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product.isNew && <Badge className="bg-cyan hover:bg-cyan text-ink border-none">Nouveau</Badge>}
                {product.compareAtPrice && <Badge variant="destructive">Promo</Badge>}
              </div>
              <Image src={product.images[0] || "/placeholder.jpg"} alt={product.name} fill className="object-contain p-8 mix-blend-multiply group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-4 mt-4 overflow-x-auto no-scrollbar snap-x">
                {product.images.map((img, i) => (
                  <div key={i} className="w-24 h-24 rounded-xl bg-surface border border-line flex-shrink-0 relative overflow-hidden cursor-pointer hover:border-cyan transition-colors snap-start">
                    <Image src={img || "/placeholder.jpg"} alt={`${product.name} ${i+1}`} fill className="object-contain p-2 mix-blend-multiply" sizes="96px" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/2 flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold text-ink leading-tight mb-2">{product.name}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
              <span className="font-medium text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full">{product.brand}</span>
              <div className="flex items-center gap-1 text-orange">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold">{product.rating}</span>
                <span className="text-slate ml-1 font-normal">({product.reviewCount} avis)</span>
              </div>
              <span className="text-slate">SKU: {product.sku}</span>
            </div>

            <div className="flex items-end gap-3 mb-8">
              <span className="text-4xl font-bold text-ink">{product.price} DA</span>
              {product.compareAtPrice && (
                <span className="text-lg text-slate line-through mb-1">{product.compareAtPrice} DA</span>
              )}
            </div>

            <p className="text-lg text-slate text-balance leading-relaxed mb-10">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <AddToCartFullButton product={product} />
              <button className="w-14 h-14 shrink-0 flex items-center justify-center border border-line rounded-xl hover:border-cyan hover:text-cyan transition-colors text-slate">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 pt-8 border-t border-line">
              <div className="flex items-center gap-4 text-ink">
                <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center"><Truck className="w-6 h-6 text-cyan-700" /></div>
                <div>
                  <h4 className="font-bold">Livraison Express</h4>
                  <p className="text-sm text-slate">Expédition sous 24h vers les 58 wilayas.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-ink">
                <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center"><ShieldCheck className="w-6 h-6 text-cyan-700" /></div>
                <div>
                  <h4 className="font-bold">Paiement Sécurisé</h4>
                  <p className="text-sm text-slate">Payez à la livraison en toute tranquillité.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
