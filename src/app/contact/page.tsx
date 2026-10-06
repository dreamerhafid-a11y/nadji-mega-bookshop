import { Phone, Mail, Clock } from "lucide-react";

export const metadata = { title: "Contact | Nadji Mega Bookstore" };

export default function ContactPage() {
  return (
    <div className="container-page py-16">
      <h1 className="text-4xl font-bold text-ink mb-12">Contactez-nous</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="p-4 bg-cyan-50 text-cyan-700 rounded-2xl"><Phone className="w-6 h-6" /></div>
            <div>
              <h3 className="font-bold text-lg">Téléphone</h3>
              <p className="text-slate mt-1">05 55 00 00 00<br/>07 70 00 00 00</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-4 bg-cyan-50 text-cyan-700 rounded-2xl"><Mail className="w-6 h-6" /></div>
            <div>
              <h3 className="font-bold text-lg">Email</h3>
              <p className="text-slate mt-1">contact@nadjibookstore.dz</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-4 bg-cyan-50 text-cyan-700 rounded-2xl"><Clock className="w-6 h-6" /></div>
            <div>
              <h3 className="font-bold text-lg">Horaires d&apos;ouverture</h3>
              <p className="text-slate mt-1">Samedi - Jeudi : 09h00 - 18h00<br/>Vendredi : Fermé</p>
            </div>
          </div>
        </div>
        <div className="bg-surface p-8 rounded-3xl border border-line">
          <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
          <form className="space-y-4">
            <input type="text" placeholder="Nom complet" className="w-full bg-white border border-line rounded-xl px-4 py-3 focus:outline-none focus:border-cyan" />
            <input type="email" placeholder="Email" className="w-full bg-white border border-line rounded-xl px-4 py-3 focus:outline-none focus:border-cyan" />
            <textarea rows={4} placeholder="Votre message..." className="w-full bg-white border border-line rounded-xl px-4 py-3 focus:outline-none focus:border-cyan"></textarea>
            <button className="w-full bg-ink text-white font-bold py-4 rounded-xl hover:bg-cyan hover:text-ink transition-colors">Envoyer</button>
          </form>
        </div>
      </div>
    </div>
  );
}
