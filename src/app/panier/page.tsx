import { CartClient } from "./CartClient";

export const metadata = {
  title: "Votre Panier | Nadji Mega Bookstore",
};

export default function CartPage() {
  return (
    <div className="container-page py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-ink mb-10">Votre Panier</h1>
      <CartClient />
    </div>
  );
}
