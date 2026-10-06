"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Trash2, ShieldCheck, Truck } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useEffect, useState } from "react";

export function CartClient() {
  const [mounted, setMounted] = useState(false);
  const cart = useCartStore(state => state.items);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const removeItem = useCartStore(state => state.removeItem);
  const subtotal = useCartStore(state => state.getCartTotal());

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="py-20 text-center">Chargement de votre panier...</div>;
  }

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-ink mb-4">Votre panier est vide</h2>
        <Link href="/boutique" className="inline-flex bg-cyan text-ink font-bold px-8 py-4 rounded-xl hover:bg-cyan-600 transition-colors">
          Commencer mes achats
        </Link>
      </div>
    );
  }

  const delivery = 800; // Mock delivery fee
  const total = subtotal + delivery;

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      {/* Cart Items */}
      <div className="flex-1 space-y-6">
        <div className="bg-white border border-line rounded-3xl overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 p-6 bg-surface border-b border-line text-sm font-bold text-slate">
            <div className="col-span-6">Produit</div>
            <div className="col-span-2 text-center">Prix</div>
            <div className="col-span-2 text-center">Quantité</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          <div className="divide-y divide-line">
            {cart.map(item => (
              <div key={item.id} className="p-6 flex flex-col md:grid md:grid-cols-12 gap-4 items-center">
                <div className="col-span-6 flex items-center gap-4 w-full">
                  <div className="w-24 h-24 bg-surface rounded-xl flex-shrink-0 flex items-center justify-center border border-line relative overflow-hidden">
                    <Image src={item.images[0] || "/placeholder.jpg"} alt={item.name} fill className="object-contain p-2 mix-blend-multiply" />
                  </div>
                  <div>
                    <h3 className="font-bold text-ink hover:text-cyan-700 transition-colors line-clamp-2">
                      <Link href={`/produit/${item.slug}`}>{item.name}</Link>
                    </h3>
                    <p className="text-sm text-slate mt-1">{item.brand}</p>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 text-sm font-medium flex items-center gap-1 mt-2 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" /> Supprimer
                    </button>
                  </div>
                </div>

                <div className="hidden md:block col-span-2 text-center font-medium text-ink">
                  {item.price} DA
                </div>

                <div className="col-span-2 flex justify-center w-full md:w-auto mt-4 md:mt-0">
                  <div className="flex items-center border border-line rounded-lg bg-surface h-10 w-32 md:w-full max-w-[100px]">
                    <button 
                      onClick={() => updateQuantity(item.id, item.cartQuantity - 1)}
                      className="flex-1 h-full text-lg hover:bg-line transition-colors rounded-l-lg"
                    >-</button>
                    <span className="flex-1 text-center font-bold">{item.cartQuantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, Math.min(item.stock, item.cartQuantity + 1))}
                      className="flex-1 h-full text-lg hover:bg-line transition-colors rounded-r-lg"
                    >+</button>
                  </div>
                </div>

                <div className="col-span-2 text-right font-bold text-lg text-ink w-full md:w-auto mt-2 md:mt-0 flex justify-between md:block">
                  <span className="md:hidden text-slate text-sm font-normal">Sous-total :</span>
                  {item.price * item.cartQuantity} DA
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <Link href="/boutique" className="inline-flex font-semibold text-cyan-700 hover:text-cyan-800 transition-colors">
          ← Continuer mes achats
        </Link>
      </div>

      {/* Order Summary */}
      <div className="w-full lg:w-[400px] flex-shrink-0">
        <div className="bg-surface rounded-3xl p-8 border border-line sticky top-24">
          <h2 className="text-xl font-bold text-ink mb-6">Résumé de la commande</h2>
          
          <div className="space-y-4 text-slate mb-6">
            <div className="flex justify-between">
              <span>Sous-total ({cart.length} articles)</span>
              <span className="font-medium text-ink">{subtotal} DA</span>
            </div>
            <div className="flex justify-between">
              <span>Frais de livraison</span>
              <span className="text-sm">Calculé à l'étape suivante</span>
            </div>
          </div>

          <div className="border-t border-line pt-6 mb-8">
            <div className="flex justify-between items-end">
              <span className="font-bold text-lg text-ink">Total Estimé</span>
              <span className="font-bold text-3xl text-ink">{subtotal} <span className="text-xl">DA</span></span>
            </div>
            <p className="text-xs text-slate mt-2 text-right">Taxes incluses si applicable</p>
          </div>

          <Link href="/commande" className="w-full flex items-center justify-center gap-2 bg-cyan text-ink font-bold text-lg py-4 rounded-xl hover:bg-cyan-600 transition-all shadow-sm">
            Valider la commande <ArrowRight className="w-5 h-5" />
          </Link>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3 text-sm text-slate">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Paiement sécurisé à la livraison</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate">
              <Truck className="w-5 h-5 text-cyan-700" />
              <span>Expédition rapide sur 58 wilayas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
