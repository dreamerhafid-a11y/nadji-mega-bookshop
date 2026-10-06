import { getProducts } from "@/data/products";
import { getCategory } from "@/data/categories";
import { notFound } from "next/navigation";
import Image from "next/image";
import { FilterSidebar } from "@/components/product/FilterSidebar";
import { ProductGrid } from "@/components/product/ProductGrid";

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const cat = getCategory(resolvedParams.category);
  if (!cat) return {};
  return { title: cat.name + " | Nadji Mega Bookstore" };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const category = getCategory(resolvedParams.category);
  
  if (!category) {
    notFound();
  }

  const products = getProducts().filter(p => p.category === category.slug);

  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-ink relative overflow-hidden">
        {category.image && (
          <div className="absolute inset-0 opacity-40">
            <Image src={category.image} alt={category.name} fill className="object-cover" sizes="100vw" />
          </div>
        )}
        <div className="container-page relative z-10 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {category.name}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto text-balance">
            {category.description}
          </p>
        </div>
      </div>

      <div className="container-page py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <FilterSidebar />
          <div className="flex-1 w-full">
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </div>
  );
}
