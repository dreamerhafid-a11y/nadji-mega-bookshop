import Link from 'next/link';
import Image from 'next/image';
import { Globe, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-ink text-surface pt-16 pb-8">
      <div className="container-page grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Col */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
             <Image src="/brand/nadji-logo-192.png" alt="Nadji Logo" width={64} height={64} className="rounded-full" />
             <span className="font-display font-bold text-2xl text-cyan leading-none">
               Nadji<br/><span className="text-white text-base font-sans tracking-widest">MEGA BOOKSTORE</span>
             </span>
          </div>
          <p className="text-muted-ink text-sm text-balance">
            Votre destination incontournable pour les livres, les fournitures scolaires, la papeterie et les articles de bureau en Algérie.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 bg-ink-3 rounded-full text-white hover:bg-cyan hover:text-ink transition-colors">
              <Globe className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-ink-3 rounded-full text-white hover:bg-cyan hover:text-ink transition-colors">
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-bold text-lg mb-6">Boutique</h3>
          <ul className="space-y-4 text-sm text-muted-ink">
            <li><Link href="/livres" className="hover:text-cyan transition-colors">Livres & Romans</Link></li>
            <li><Link href="/fournitures-scolaires" className="hover:text-cyan transition-colors">Fournitures scolaires</Link></li>
            <li><Link href="/papeterie" className="hover:text-cyan transition-colors">Papeterie & Carnets</Link></li>
            <li><Link href="/bureau" className="hover:text-cyan transition-colors">Fournitures de bureau</Link></li>
            <li><Link href="/arts-creativite" className="hover:text-cyan transition-colors">Arts & Créativité</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-6">Informations</h3>
          <ul className="space-y-4 text-sm text-muted-ink">
            <li><Link href="/a-propos" className="hover:text-cyan transition-colors">À propos de nous</Link></li>
            <li><Link href="/magasins" className="hover:text-cyan transition-colors">Nos magasins</Link></li>
            <li><Link href="/livraison" className="hover:text-cyan transition-colors">Livraison & Frais</Link></li>
            <li><Link href="/faq" className="hover:text-cyan transition-colors">Foire aux questions</Link></li>
            <li><Link href="/contact" className="hover:text-cyan transition-colors">Contactez-nous</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-6">Contact</h3>
          <ul className="space-y-4 text-sm text-muted-ink">
            <li className="flex gap-3">
              <MapPin className="w-5 h-5 text-cyan shrink-0" />
              <span>Hussein Dey (Métro Amirouche)<br/>Oran (Hay Djamel)</span>
            </li>
            <li className="flex gap-3">
              <Phone className="w-5 h-5 text-cyan shrink-0" />
              <span>05 55 00 00 00</span>
            </li>
            <li className="flex gap-3">
              <Mail className="w-5 h-5 text-cyan shrink-0" />
              <span>contact@nadjibookstore.dz</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container-page pt-8 border-t border-ink-3 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-ink">
        <p>© 2026 Nadji Mega Bookstore. Tous droits réservés.</p>
        <div className="flex gap-6">
          <Link href="/conditions-generales" className="hover:text-white transition-colors">CGV</Link>
          <Link href="/politique-de-confidentialite" className="hover:text-white transition-colors">Confidentialité</Link>
          <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
        </div>
      </div>
    </footer>
  );
}
