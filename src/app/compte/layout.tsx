import Link from "next/link";
import { User, Package, MapPin, Heart, LogOut } from "lucide-react";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-page py-12">
      <h1 className="text-3xl font-bold text-ink mb-8">Mon Compte</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 flex-shrink-0 space-y-2">
          <Link href="/compte" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface text-ink font-medium transition-colors">
            <User className="w-5 h-5" /> Vue d&apos;ensemble
          </Link>
          <Link href="/compte/commandes" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface text-ink font-medium transition-colors">
            <Package className="w-5 h-5" /> Mes commandes
          </Link>
          <Link href="/compte/adresses" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface text-ink font-medium transition-colors">
            <MapPin className="w-5 h-5" /> Mes adresses
          </Link>
          <Link href="/favoris" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface text-ink font-medium transition-colors">
            <Heart className="w-5 h-5" /> Mes favoris
          </Link>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-500 font-medium transition-colors w-full text-left mt-8">
            <LogOut className="w-5 h-5" /> Déconnexion
          </button>
        </aside>
        <main className="flex-1 bg-white border border-line rounded-3xl p-6 md:p-8 shadow-sm">
          {children}
        </main>
      </div>
    </div>
  );
}
