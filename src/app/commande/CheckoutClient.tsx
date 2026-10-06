"use client";

import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import { CheckCircle2, Truck, Wallet, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, type CheckoutInput } from "@/lib/validations";

export function CheckoutClient() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const cart = useCartStore(state => state.items);
  const subtotal = useCartStore(state => state.getCartTotal());
  const clearCart = useCartStore(state => state.clearCart);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const supabase = createClient();

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "", lastName: "", phone: "", email: "", wilaya: "", city: "", address: ""
    }
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return <div className="py-20 text-center">Chargement...</div>;
  if (cart.length === 0) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl mb-4">Votre panier est vide.</h2>
        <button onClick={() => router.push('/boutique')} className="bg-cyan px-6 py-2 rounded-xl text-ink font-bold">Retour à la boutique</button>
      </div>
    );
  }

  const delivery = 800; // Mock
  const total = subtotal + delivery;

  const onSubmit = async (data: CheckoutInput) => {
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const { error } = await supabase.rpc('create_order', {
        p_customer: { first_name: data.firstName, last_name: data.lastName, phone: data.phone, email: data.email },
        p_address: { wilaya: data.wilaya, city: data.city, address: data.address },
        p_items: cart.map(item => ({ product_id: item.id, quantity: item.cartQuantity }))
      });

      if (error) {
        // Fallback mock logic here if DB not ready
        console.error(error);
        const { error: insertError } = await supabase.from('orders').insert({
          customer_infos: { first_name: data.firstName, last_name: data.lastName, phone: data.phone, email: data.email },
          wilaya: data.wilaya,
          subtotal,
          delivery_fee: delivery,
          total,
          status: 'pending',
          payment_method: 'cash_on_delivery'
        });
        if (insertError) throw insertError;
      }

      clearCart();
      router.push('/commande/confirmation');
    } catch (err: any) {
      setErrorMsg(err.message || "Une erreur est survenue lors de la validation.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:flex-row gap-12 lg:gap-16">
      <div className="flex-1 space-y-10">
        {errorMsg && <div className="bg-red-50 text-red-500 p-4 rounded-xl font-bold">{errorMsg}</div>}
        
        <section className="bg-white p-6 md:p-10 rounded-3xl border border-line shadow-sm">
          <h2 className="text-2xl font-bold text-ink mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-800 flex items-center justify-center text-sm">1</span>
            Informations de contact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-ink">Prénom *</label>
              <input {...register("firstName")} type="text" className={`w-full bg-surface border rounded-xl px-4 py-3 focus:outline-none ${errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-line focus:border-cyan'}`} placeholder="Votre prénom" />
              {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-ink">Nom *</label>
              <input {...register("lastName")} type="text" className={`w-full bg-surface border rounded-xl px-4 py-3 focus:outline-none ${errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-line focus:border-cyan'}`} placeholder="Votre nom" />
              {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-ink">Numéro de téléphone *</label>
              <input {...register("phone")} type="tel" className={`w-full bg-surface border rounded-xl px-4 py-3 focus:outline-none ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-line focus:border-cyan'}`} placeholder="0555000000" />
              {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-ink">Email (Optionnel)</label>
              <input {...register("email")} type="email" className={`w-full bg-surface border rounded-xl px-4 py-3 focus:outline-none ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-line focus:border-cyan'}`} placeholder="Pour le suivi de commande" />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>
          </div>
        </section>

        <section className="bg-white p-6 md:p-10 rounded-3xl border border-line shadow-sm">
          <h2 className="text-2xl font-bold text-ink mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-800 flex items-center justify-center text-sm">2</span>
            Livraison
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-ink">Wilaya *</label>
              <select {...register("wilaya")} className={`w-full bg-surface border rounded-xl px-4 py-3 focus:outline-none appearance-none ${errors.wilaya ? 'border-red-500 focus:border-red-500' : 'border-line focus:border-cyan'}`}>
                <option value="">Sélectionnez votre wilaya</option>
                <option value="16">16 - Alger</option>
                <option value="31">31 - Oran</option>
              </select>
              {errors.wilaya && <p className="text-red-500 text-xs">{errors.wilaya.message}</p>}
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-ink">Commune *</label>
              <input {...register("city")} type="text" className={`w-full bg-surface border rounded-xl px-4 py-3 focus:outline-none ${errors.city ? 'border-red-500 focus:border-red-500' : 'border-line focus:border-cyan'}`} placeholder="Votre commune" />
              {errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p>}
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-ink">Adresse complète *</label>
              <textarea {...register("address")} rows={3} className={`w-full bg-surface border rounded-xl px-4 py-3 focus:outline-none ${errors.address ? 'border-red-500 focus:border-red-500' : 'border-line focus:border-cyan'}`} placeholder="Rue, N° de bâtiment..."></textarea>
              {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
            </div>
          </div>
        </section>

        <section className="bg-white p-6 md:p-10 rounded-3xl border border-line shadow-sm">
          <h2 className="text-2xl font-bold text-ink mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-800 flex items-center justify-center text-sm">3</span>
            Paiement
          </h2>
          <div className="border-2 border-cyan bg-cyan-50/50 rounded-2xl p-6 flex items-start gap-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-cyan text-ink text-xs font-bold px-3 py-1 rounded-bl-xl">Par Défaut</div>
            <div className="mt-1">
              <div className="w-6 h-6 rounded-full border-4 border-cyan bg-white flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-cyan"></div>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg text-ink flex items-center gap-2">
                <Wallet className="w-5 h-5" /> Paiement à la livraison (Cash)
              </h3>
              <p className="text-slate mt-1">Vous payerez le livreur en espèces au moment de la réception de votre commande.</p>
            </div>
          </div>
        </section>

        <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 bg-ink text-white font-bold text-xl py-5 rounded-2xl hover:bg-cyan hover:text-ink transition-all shadow-xl disabled:opacity-50">
          {isSubmitting ? "Traitement en cours..." : <>Confirmer la commande <CheckCircle2 className="w-6 h-6" /></>}
        </button>
      </div>

      <div className="w-full lg:w-[400px]">
        <div className="bg-white rounded-3xl p-8 border border-line sticky top-6 shadow-sm">
          <h3 className="text-xl font-bold text-ink mb-6">Récapitulatif</h3>
          <div className="space-y-4 mb-6 pb-6 border-b border-line max-h-96 overflow-y-auto no-scrollbar">
            {cart.map(item => (
              <div key={item.id} className="flex gap-4">
                <div className="w-16 h-16 bg-surface rounded-lg border border-line relative overflow-hidden flex-shrink-0">
                  <Image src={item.images[0] || "/placeholder.jpg"} alt={item.name} fill className="object-contain p-1 mix-blend-multiply" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-ink line-clamp-1">{item.name}</h4>
                  <p className="text-xs text-slate">Qté: {item.cartQuantity}</p>
                  <p className="font-bold mt-1 text-sm">{item.price} DA</p>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4 text-slate mb-6">
            <div className="flex justify-between"><span>Sous-total</span><span className="font-medium text-ink">{subtotal} DA</span></div>
            <div className="flex justify-between"><span>Livraison</span><span className="font-medium text-ink">{delivery} DA</span></div>
          </div>
          <div className="border-t border-line pt-6">
            <div className="flex justify-between items-end"><span className="font-bold text-lg text-ink">Total</span><span className="font-bold text-3xl text-ink">{total} <span className="text-xl">DA</span></span></div>
          </div>
        </div>
      </div>
    </form>
  );
}
