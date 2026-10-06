import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { CheckoutClient } from "./CheckoutClient";

export const metadata = {
  title: "Finaliser la commande | Nadji Mega Bookstore",
};

export default function CheckoutPage() {
  return (
    <div className="bg-surface min-h-screen pb-20">
      <header className="bg-white border-b border-line py-6">
        <div className="container-page flex items-center justify-between">
          <Link href="/panier" className="flex items-center gap-2 text-slate hover:text-ink font-medium transition-colors">
            <ChevronLeft className="w-5 h-5" /> Retour
          </Link>
          <div className="flex items-center gap-2">
            <Image src="/brand/nadji-logo-192.png" alt="Nadji" width={40} height={40} className="rounded-full" />
            <span className="font-bold text-xl text-ink hidden sm:inline">Paiement Sécurisé</span>
          </div>
          <div className="w-24"></div>
        </div>
      </header>

      <div className="container-page pt-10">
        <CheckoutClient />
      </div>
    </div>
  );
}
