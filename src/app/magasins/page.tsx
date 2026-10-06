import { MapPin, Phone, Clock } from "lucide-react";

export const metadata = { title: "Nos Magasins | Nadji Mega Bookstore" };

export default function StoresPage() {
  const stores = [
    { name: "Nadji Hussein Dey", address: "Avenue de l'ALN, Près de la station Métro Amirouche, Alger", phone: "05 55 00 00 01", hours: "Sam-Jeu: 09h-18h" },
    { name: "Nadji Oran", address: "Hay Djamel, Oran", phone: "05 55 00 00 02", hours: "Sam-Jeu: 09h-18h" }
  ];

  return (
    <div className="container-page py-16">
      <h1 className="text-4xl font-bold text-ink mb-12">Nos Magasins</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {stores.map(store => (
          <div key={store.name} className="bg-white p-8 rounded-3xl border border-line shadow-sm">
            <h2 className="text-2xl font-bold text-ink mb-4">{store.name}</h2>
            <div className="space-y-4 text-slate">
              <div className="flex items-start gap-3"><MapPin className="w-5 h-5 text-cyan-700 shrink-0" /><span>{store.address}</span></div>
              <div className="flex items-start gap-3"><Phone className="w-5 h-5 text-cyan-700 shrink-0" /><span>{store.phone}</span></div>
              <div className="flex items-start gap-3"><Clock className="w-5 h-5 text-cyan-700 shrink-0" /><span>{store.hours}</span></div>
            </div>
            <button className="mt-6 w-full py-3 bg-surface text-ink font-bold rounded-xl hover:bg-cyan hover:text-ink transition-colors">Voir sur la carte</button>
          </div>
        ))}
      </div>
    </div>
  );
}
