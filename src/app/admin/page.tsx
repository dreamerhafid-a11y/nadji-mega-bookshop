import { TrendingUp, ShoppingCart, DollarSign, Package, MoreHorizontal, CheckCircle2, Clock } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8 pb-20">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-ink">Tableau de bord</h1>
          <p className="text-slate">Bienvenue sur l'interface d'administration de la boutique.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-line text-ink font-bold px-5 py-2.5 rounded-full shadow-sm hover:border-cyan transition-colors">
            Exporter
          </button>
          <button className="bg-ink text-white font-bold px-5 py-2.5 rounded-full shadow-md hover:bg-cyan hover:text-ink transition-all">
            + Ajouter Produit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-line shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-50 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-cyan-100 text-cyan-800 rounded-2xl"><DollarSign className="w-6 h-6" /></div>
              <span className="flex items-center text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full"><TrendingUp className="w-3 h-3 mr-1" /> +12%</span>
            </div>
            <p className="text-slate font-medium">Chiffre d'affaires (Mois)</p>
            <h3 className="text-3xl font-heading font-black text-ink mt-1">1,245,000 DA</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-line shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange/10 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-orange/20 text-orange rounded-2xl"><ShoppingCart className="w-6 h-6" /></div>
              <span className="flex items-center text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full"><TrendingUp className="w-3 h-3 mr-1" /> +8%</span>
            </div>
            <p className="text-slate font-medium">Commandes à traiter</p>
            <h3 className="text-3xl font-heading font-black text-ink mt-1">42</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-line shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-50 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-100 text-purple-700 rounded-2xl"><Package className="w-6 h-6" /></div>
            </div>
            <p className="text-slate font-medium">Produits en rupture</p>
            <h3 className="text-3xl font-heading font-black text-ink mt-1">14</h3>
          </div>
        </div>
      </div>

      <div className="bg-white border border-line rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-line flex justify-between items-center">
          <h2 className="text-xl font-heading font-extrabold text-ink">Dernières commandes</h2>
          <button className="text-cyan-700 font-bold hover:underline">Voir tout</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface text-slate text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-bold">Commande</th>
                <th className="px-6 py-4 font-bold">Client</th>
                <th className="px-6 py-4 font-bold">Date</th>
                <th className="px-6 py-4 font-bold">Statut</th>
                <th className="px-6 py-4 font-bold text-right">Montant</th>
                <th className="px-6 py-4 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[
                { id: "#CMD-1029", name: "Amine K.", date: "Aujourd'hui, 14:30", status: "En attente", amount: "12,400 DA", badge: "bg-orange/20 text-orange", icon: Clock },
                { id: "#CMD-1028", name: "Sarah B.", date: "Aujourd'hui, 11:15", status: "Expédiée", amount: "4,500 DA", badge: "bg-cyan-100 text-cyan-800", icon: CheckCircle2 },
                { id: "#CMD-1027", name: "Walid M.", date: "Hier, 16:45", status: "Livrée", amount: "28,900 DA", badge: "bg-green-100 text-green-700", icon: CheckCircle2 },
                { id: "#CMD-1026", name: "Kenza T.", date: "Hier, 09:20", status: "En attente", amount: "1,200 DA", badge: "bg-orange/20 text-orange", icon: Clock },
              ].map((cmd, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-ink">{cmd.id}</td>
                  <td className="px-6 py-4 font-medium">{cmd.name}</td>
                  <td className="px-6 py-4 text-slate">{cmd.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${cmd.badge}`}>
                      <cmd.icon className="w-3.5 h-3.5" />
                      {cmd.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-right">{cmd.amount}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-slate hover:text-cyan p-2"><MoreHorizontal className="w-5 h-5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
