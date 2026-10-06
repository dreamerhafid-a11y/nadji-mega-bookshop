export default function AccountOverview() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-ink mb-6">Vue d&apos;ensemble</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface p-6 rounded-2xl border border-line">
          <h3 className="font-bold text-lg mb-4">Informations personnelles</h3>
          <p className="text-slate">Prénom Nom<br/>email@example.com</p>
          <button className="mt-4 text-cyan-700 font-medium hover:underline">Modifier</button>
        </div>
        <div className="bg-surface p-6 rounded-2xl border border-line">
          <h3 className="font-bold text-lg mb-4">Dernière commande</h3>
          <p className="text-slate">Aucune commande récente.</p>
        </div>
      </div>
    </div>
  );
}
