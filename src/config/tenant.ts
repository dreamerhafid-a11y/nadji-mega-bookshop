export const tenantConfig = {
  id: "kaya-store",
  name: "KAYA",
  theme: {
    primary: "#FF2A70", // Kaya Pink
    ink: "#080808",
    accent: "#6C5CE7", // Purple accent
    radius: "1rem", // slightly more square/elegant for Kaya
    fontHeading: "'Outfit', sans-serif",
    fontBody: "'Nunito', sans-serif",
  },
  logo: {
    url: "/kaya-logo.png", // We will fallback to text in UI if missing
    alt: "Kaya Logo",
  },
  contact: {
    phone: "+213 555 11 22 33",
    email: "hello@kaya-store.dz",
    address: "Oran, Algérie"
  },
  features: {
    hasBlog: true,
    hasWishlist: true,
  }
};
