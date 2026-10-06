import Link from "next/link";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";

export const metadata = { title: "Commande confirmée | Nadji Mega Bookstore" };

export default function ConfirmationPage() {
  return (
    <div className="container-page py-20 flex flex-col items-center justify-center text-center min-h-[70vh]">
      <div className="w-24 h-24 bg-cyan-50 text-cyan-700 rounded-full flex items-center justify-center mb-8">
        <CheckCircle2 className="w-12 h-12" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-ink mb-4">Commande confirmée !</h1>
      <p className="text-lg text-slate max-w-xl mb-12">
        Merci pour votre achat. Votre commande a été enregistrée avec succès et sera traitée dans les plus brefs délais. Vous serez contacté par notre transporteur avant la livraison.
      </p>
      
      <div className="bg-surface p-8 rounded-3xl border border-line w-full max-w-lg mb-12">
        <div className="flex items-center gap-4 text-ink font-bold mb-4">
          <Package className="w-6 h-6 text-cyan-700" />
          <span>Suivi de commande</span>
        </div>
        <p className="text-sm text-slate mb-6 text-left">
          Vous pouvez suivre l'état de votre commande à tout moment depuis votre espace client ou via le lien reçu par SMS/Email.
        </p>
        <Link href="/compte/commandes" className="w-full flex items-center justify-center gap-2 bg-white border border-line text-ink font-bold py-4 rounded-xl hover:border-cyan transition-colors">
          Suivre ma commande
        </Link>
      </div>

      <Link href="/boutique" className="inline-flex font-semibold text-cyan-700 hover:text-cyan-800 transition-colors">
        Continuer mes achats <ArrowRight className="w-5 h-5 ml-2" />
      </Link>
    </div>
  );
}
