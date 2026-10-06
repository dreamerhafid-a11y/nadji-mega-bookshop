import Image from "next/image";

export const metadata = { title: "À propos | Nadji Mega Bookstore" };

export default function AboutPage() {
  return (
    <div className="container-page py-16">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-ink">Notre Histoire</h1>
        <div className="aspect-video relative rounded-3xl overflow-hidden mb-8">
          <Image src="/images/hero/store.jpg" alt="Notre magasin" fill className="object-cover" />
        </div>
        <p className="text-lg text-slate leading-relaxed">
          Fondée avec la passion de la lecture et de la créativité, Nadji Mega Bookstore est devenue une référence incontournable en Algérie. Nous proposons la plus large sélection de livres, fournitures scolaires, papeterie et matériel d&apos;art.
        </p>
        <h2 className="text-2xl font-bold text-ink mt-8">Notre Mission</h2>
        <p className="text-slate leading-relaxed">
          Rendre la culture, l'éducation et la créativité accessibles à tous. Avec une expédition sur les 58 wilayas, nous veillons à ce que chaque étudiant, professionnel et artiste ait les bons outils entre les mains.
        </p>
      </div>
    </div>
  );
}
