import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, PenTool, CheckCircle } from "lucide-react";
import { getProducts } from "@/data/products";
import { categories } from "@/data/categories";
import { ProductCard } from "@/components/product/ProductCard";

export default function Home() {
  const products = getProducts();
  const featuredProducts = products.slice(0, 4);
  const newProducts = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-20">
      {/* ================= HERO SECTION ================= */}
      <section className="bg-surface relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 border-b border-line">
        <div className="container-page relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          <div className="flex-1 space-y-8 max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] text-ink">
              Tout ce qu&apos;il vous faut pour <span className="text-cyan-700">apprendre</span>, créer et réussir.
            </h1>
            <p className="text-xl text-slate max-w-lg leading-relaxed">
              Livres, fournitures scolaires, papeterie et bien plus. La référence incontournable en Algérie.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/boutique" className="bg-cyan-700 text-white font-semibold px-8 py-4 rounded-xl hover:bg-cyan-600 transition-colors shadow-sm">
                Découvrir la boutique
              </Link>
              <Link href="/offres" className="bg-white border-2 border-line text-ink font-semibold px-8 py-4 rounded-xl hover:border-ink transition-colors">
                Voir les offres
              </Link>
            </div>
            
            <div className="flex items-center gap-6 pt-6 text-sm text-muted-ink">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-cyan-700" /> 58 Wilayas
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-cyan-700" /> Paiement à la livraison
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lift bg-white relative">
              <Image 
                src="/images/hero/hero.jpg" 
                alt="Livres et fournitures de bureau" 
                fill 
                className="object-cover"
                priority
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-orange/10 rounded-full blur-2xl -z-10"></div>
          </div>

        </div>
      </section>

      {/* ================= CATEGORIES BENTO GRID ================= */}
      <section className="container-page">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-2">Explorez nos univers</h2>
            <p className="text-slate">Trouvez exactement ce dont vous avez besoin.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[240px]">
          {categories.map((cat, i) => (
            <Link 
              key={cat.slug} 
              href={`/${cat.slug}`}
              className={`group relative rounded-3xl overflow-hidden block ${
                i === 0 ? "md:col-span-2 md:row-span-2" : 
                i === 1 ? "md:col-span-2" : ""
              }`}
            >
              <Image 
                src={cat.image} 
                alt={cat.name} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{cat.name}</h3>
                <span className="inline-flex items-center text-cyan font-medium group-hover:gap-3 gap-2 transition-all">
                  Découvrir <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= TRENDING PRODUCTS ================= */}
      <section className="container-page">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-2">Populaires en ce moment</h2>
            <p className="text-slate">Les articles les plus demandés par nos clients.</p>
          </div>
          <Link href="/boutique" className="hidden md:flex items-center gap-2 font-medium text-cyan-700 hover:text-cyan-600 transition-colors">
            Voir tout <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ================= PROMO BANNER ================= */}
      <section className="container-page">
        <div className="bg-ink rounded-3xl overflow-hidden relative flex flex-col md:flex-row items-center justify-between p-8 md:p-16">
          <div className="relative z-10 max-w-lg mb-8 md:mb-0">
            <span className="inline-block py-1 px-3 rounded-full bg-orange/20 text-orange text-sm font-bold mb-6">
              Offre Spéciale
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Préparez votre rentrée avec style.
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              Découvrez nos packs exclusifs et profitez de réductions allant jusqu&apos;à -20% sur la papeterie premium.
            </p>
            <Link href="/offres" className="inline-flex bg-cyan text-ink font-semibold px-8 py-4 rounded-xl hover:bg-white transition-colors">
              Profiter de l&apos;offre
            </Link>
          </div>
          
          <div className="relative z-10 w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden">
             <Image src="/images/hero/rentree.jpg" alt="Rentrée" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* ================= NEW ARRIVALS ================= */}
      {newProducts.length > 0 && (
        <section className="container-page">
          <h2 className="text-3xl font-bold text-ink mb-8">Nouveautés</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {newProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* ================= FEATURES ================= */}
      <section className="bg-surface py-16 border-y border-line mt-12">
        <div className="container-page grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-line">
            <div className="w-12 h-12 bg-cyan-50 text-cyan-700 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-ink">Large Sélection</h3>
            <p className="text-sm text-slate text-balance">Des milliers de références soigneusement sélectionnées pour tous les besoins.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-line">
            <div className="w-12 h-12 bg-orange-50 text-orange text-orange-600 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-ink">Qualité Garantie</h3>
            <p className="text-sm text-slate text-balance">Nous travaillons avec les meilleures marques mondiales et locales.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-line">
            <div className="w-12 h-12 bg-cyan-50 text-cyan-700 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-ink">Livraison Rapide</h3>
            <p className="text-sm text-slate text-balance">Expédition vers les 58 wilayas d&apos;Algérie avec suivi en temps réel.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-line">
            <div className="w-12 h-12 bg-cyan-50 text-cyan-700 rounded-xl flex items-center justify-center mb-4">
              <PenTool className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-ink">Service Client</h3>
            <p className="text-sm text-slate text-balance">Une équipe dévouée prête à vous conseiller et vous accompagner.</p>
          </div>
        </div>
      </section>
      
    </div>
  );
}
