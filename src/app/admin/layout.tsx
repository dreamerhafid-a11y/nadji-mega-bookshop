import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Users, Settings, LogOut, PackageSearch, PaintBucket } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-line flex flex-col hidden md:flex sticky top-0 h-screen">
        <div className="p-6 border-b border-line">
          <div className="font-heading font-black text-2xl text-ink leading-tight">
            NADJI<br/><span className="text-cyan">ADMIN</span>
          </div>
          <div className="mt-2 text-xs font-bold text-orange bg-orange/10 px-2 py-1 rounded-full inline-block">
            MODE DEMO
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-slate hover:bg-surface rounded-2xl font-bold transition-colors">
            <LayoutDashboard className="w-5 h-5" /> Vue d'ensemble
          </Link>
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-slate hover:bg-surface rounded-2xl font-bold transition-colors">
            <ShoppingBag className="w-5 h-5" /> Commandes
          </Link>
          <Link href="/admin/storefront" className="flex items-center gap-3 px-4 py-3 bg-cyan-50 text-cyan-800 rounded-2xl font-bold">
            <PaintBucket className="w-5 h-5" /> Storefront Editor
          </Link>
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-slate hover:bg-surface rounded-2xl font-bold transition-colors">
            <PackageSearch className="w-5 h-5" /> Catalogue
          </Link>
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-slate hover:bg-surface rounded-2xl font-bold transition-colors">
            <Users className="w-5 h-5" /> Clients
          </Link>
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-slate hover:bg-surface rounded-2xl font-bold transition-colors">
            <Settings className="w-5 h-5" /> Paramètres V.I
          </Link>
        </nav>
        <div className="p-4 border-t border-line">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-2xl font-bold transition-colors">
            <LogOut className="w-5 h-5" /> Retour Boutique
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
