import type { Category } from "@/types";

export const categories: Category[] = [
  {
    slug: "livres",
    name: "Livres",
    navLabel: "Livres",
    description: "Romans, scolaire, jeunesse, BD et bien plus.",
    heroTitle: "Le livre qu'il vous faut est peut-être ici.",
    heroText:
      "Romans, littérature, ouvrages scolaires et parascolaires, développement personnel, BD et dictionnaires : des milliers de titres pour tous les lecteurs.",
    image: "/images/categories/livres.jpg",
    subcategories: [
      { slug: "romans", name: "Romans" },
      { slug: "litterature", name: "Littérature" },
      { slug: "developpement-personnel", name: "Développement personnel" },
      { slug: "scolaire", name: "Scolaire" },
      { slug: "parascolaire", name: "Parascolaire" },
      { slug: "jeunesse", name: "Jeunesse" },
      { slug: "bd-mangas", name: "BD & Mangas" },
      { slug: "dictionnaires", name: "Dictionnaires" },
    ],
  },
  {
    slug: "fournitures-scolaires",
    name: "Fournitures scolaires",
    navLabel: "Fournitures scolaires",
    description: "Tout le nécessaire pour une année bien organisée.",
    heroTitle: "Tout pour une rentrée réussie.",
    heroText:
      "Cahiers, stylos, trousses, cartables et calculatrices : équipez-vous avec des marques de confiance, du primaire à l'université.",
    image: "/images/categories/fournitures-scolaires.jpg",
    subcategories: [
      { slug: "cahiers", name: "Cahiers" },
      { slug: "stylos", name: "Stylos" },
      { slug: "crayons", name: "Crayons" },
      { slug: "feutres", name: "Feutres" },
      { slug: "surligneurs", name: "Surligneurs" },
      { slug: "trousses", name: "Trousses" },
      { slug: "cartables", name: "Cartables" },
      { slug: "calculatrices", name: "Calculatrices" },
      { slug: "accessoires", name: "Accessoires" },
    ],
  },
  {
    slug: "papeterie",
    name: "Papeterie",
    navLabel: "Papeterie",
    description: "Carnets, planners et jolis accessoires.",
    heroTitle: "La papeterie qui donne envie d'écrire.",
    heroText:
      "Carnets, journaux, planners, notes adhésives et stylos : des essentiels beaux et pratiques pour organiser vos idées.",
    image: "/images/categories/papeterie.jpg",
    subcategories: [
      { slug: "carnets", name: "Carnets" },
      { slug: "journaux", name: "Journaux" },
      { slug: "stylos-fantaisie", name: "Stylos" },
      { slug: "planners", name: "Planners" },
      { slug: "notes-adhesives", name: "Notes adhésives" },
      { slug: "decoration", name: "Washi & déco" },
    ],
  },
  {
    slug: "bureau",
    name: "Bureau",
    navLabel: "Bureau",
    description: "Organisation et essentiels professionnels.",
    heroTitle: "Un bureau organisé, des idées plus claires.",
    heroText:
      "Agendas, classement, papier, petit matériel et instruments d'écriture : l'essentiel pour travailler efficacement.",
    image: "/images/categories/bureau.jpg",
    subcategories: [
      { slug: "agendas", name: "Agendas" },
      { slug: "classement", name: "Classement" },
      { slug: "organisation", name: "Organisateurs" },
      { slug: "papier", name: "Papier & impression" },
      { slug: "petit-materiel", name: "Petit matériel" },
      { slug: "ecriture", name: "Instruments d'écriture" },
    ],
  },
  {
    slug: "enfants",
    name: "Enfants",
    navLabel: "Enfants",
    description: "Apprendre et créer en s'amusant.",
    heroTitle: "Apprendre, imaginer, grandir.",
    heroText:
      "Jeux éducatifs, livres jeunesse, coloriage et activités créatives sélectionnés pour éveiller la curiosité des plus jeunes.",
    image: "/images/categories/enfants.jpg",
    subcategories: [
      { slug: "jeux-educatifs", name: "Jeux éducatifs" },
      { slug: "coloriage", name: "Coloriage" },
      { slug: "livres-enfants", name: "Livres pour enfants" },
      { slug: "dessin-enfants", name: "Dessin" },
      { slug: "activites-creatives", name: "Activités créatives" },
    ],
  },
  {
    slug: "arts-creativite",
    name: "Arts & Créativité",
    navLabel: "Arts & Créativité",
    description: "Dessin, peinture et loisirs créatifs.",
    heroTitle: "Donnez forme à vos idées.",
    heroText:
      "Crayons, marqueurs, peinture, carnets de croquis et matériel DIY pour les artistes débutants comme confirmés.",
    image: "/images/categories/arts-creativite.jpg",
    subcategories: [
      { slug: "dessin", name: "Dessin" },
      { slug: "peinture", name: "Peinture" },
      { slug: "marqueurs", name: "Marqueurs" },
      { slug: "carnets-croquis", name: "Carnets de croquis" },
      { slug: "diy", name: "Loisirs créatifs & DIY" },
    ],
  },
  {
    slug: "cadeaux",
    name: "Cadeaux",
    navLabel: "Cadeaux",
    description: "Des idées pour faire plaisir.",
    heroTitle: "Des cadeaux qui ont du sens.",
    heroText:
      "Coffrets, beaux stylos, carnets et cartes cadeaux : offrez le plaisir de lire, d'écrire et de créer.",
    image: "/images/categories/cadeaux.jpg",
    subcategories: [
      { slug: "coffrets", name: "Coffrets" },
      { slug: "cartes-cadeaux", name: "Cartes cadeaux" },
      { slug: "accessoires-lecture", name: "Accessoires de lecture" },
    ],
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const getSubcategoryName = (categorySlug: string, subSlug: string) =>
  getCategory(categorySlug)?.subcategories.find((s) => s.slug === subSlug)?.name ?? subSlug;

/** Mega menu layout (columns) */
export const megaMenu = [
  {
    title: "Livres",
    href: "/livres",
    links: [
      ["Romans", "/livres?sub=romans"],
      ["Littérature", "/livres?sub=litterature"],
      ["Développement personnel", "/livres?sub=developpement-personnel"],
      ["Scolaire", "/livres?sub=scolaire"],
      ["Parascolaire", "/livres?sub=parascolaire"],
      ["Jeunesse", "/livres?sub=jeunesse"],
      ["Bandes dessinées", "/livres?sub=bd-mangas"],
      ["Dictionnaires", "/livres?sub=dictionnaires"],
    ],
  },
  {
    title: "École",
    href: "/fournitures-scolaires",
    links: [
      ["Cahiers", "/fournitures-scolaires?sub=cahiers"],
      ["Stylos", "/fournitures-scolaires?sub=stylos"],
      ["Crayons", "/fournitures-scolaires?sub=crayons"],
      ["Feutres", "/fournitures-scolaires?sub=feutres"],
      ["Surligneurs", "/fournitures-scolaires?sub=surligneurs"],
      ["Trousses", "/fournitures-scolaires?sub=trousses"],
      ["Cartables", "/fournitures-scolaires?sub=cartables"],
      ["Calculatrices", "/fournitures-scolaires?sub=calculatrices"],
    ],
  },
  {
    title: "Bureau",
    href: "/bureau",
    links: [
      ["Classement", "/bureau?sub=classement"],
      ["Agendas", "/bureau?sub=agendas"],
      ["Blocs-notes", "/papeterie?sub=notes-adhesives"],
      ["Accessoires de bureau", "/bureau?sub=organisation"],
      ["Impression", "/bureau?sub=papier"],
    ],
  },
  {
    title: "Créativité",
    href: "/arts-creativite",
    links: [
      ["Dessin", "/arts-creativite?sub=dessin"],
      ["Peinture", "/arts-creativite?sub=peinture"],
      ["Loisirs créatifs", "/arts-creativite?sub=diy"],
      ["DIY", "/arts-creativite?sub=diy"],
    ],
  },
] as const;
