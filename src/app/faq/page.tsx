export const metadata = { title: "FAQ | Nadji Mega Bookstore" };
export default function FAQPage() {
  return (
    <div className="container-page py-16 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-ink mb-12 text-center">Questions Fréquentes</h1>
      <div className="space-y-6">
        <div className="bg-white border border-line p-6 rounded-2xl">
          <h3 className="font-bold text-lg mb-2">Quels sont les délais de livraison ?</h3>
          <p className="text-slate">Nous livrons sous 24 à 48h à Alger et ses environs, et sous 3 à 5 jours pour le reste des 58 wilayas.</p>
        </div>
        <div className="bg-white border border-line p-6 rounded-2xl">
          <h3 className="font-bold text-lg mb-2">Acceptez-vous le paiement à la livraison ?</h3>
          <p className="text-slate">Oui, le paiement s&apos;effectue en espèces à la livraison pour toutes les commandes.</p>
        </div>
        <div className="bg-white border border-line p-6 rounded-2xl">
          <h3 className="font-bold text-lg mb-2">Puis-je retourner un article ?</h3>
          <p className="text-slate">Oui, vous disposez de 7 jours pour retourner ou échanger un article dans son emballage d&apos;origine.</p>
        </div>
      </div>
    </div>
  );
}
