"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validations";
import type { z } from "zod";

type RegisterInput = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setLoading(true);
    setErrorMsg("");
    const { error: signUpError } = await supabase.auth.signUp({ 
      email: data.email, 
      password: data.password,
      options: { data: { first_name: data.firstName, last_name: data.lastName } }
    });
    if (signUpError) {
      setErrorMsg(signUpError.message);
      setLoading(false);
    } else {
      router.push("/compte");
      router.refresh();
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-surface">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-line shadow-sm space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold text-ink">Inscription</h2>
          <p className="mt-2 text-center text-sm text-slate">
            Vous avez déjà un compte ?{" "}
            <Link href="/connexion" className="font-medium text-cyan-700 hover:text-cyan-800 transition-colors">Connectez-vous</Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {errorMsg && <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">{errorMsg}</div>}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-ink">Prénom</label>
              <input {...register("firstName")} type="text" className={`w-full mt-1 bg-surface border rounded-xl px-4 py-3 focus:outline-none ${errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-line focus:border-cyan'}`} />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-ink">Nom</label>
              <input {...register("lastName")} type="text" className={`w-full mt-1 bg-surface border rounded-xl px-4 py-3 focus:outline-none ${errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-line focus:border-cyan'}`} />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-ink">Email</label>
            <input {...register("email")} type="email" className={`w-full mt-1 bg-surface border rounded-xl px-4 py-3 focus:outline-none ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-line focus:border-cyan'}`} />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-ink">Mot de passe</label>
            <input {...register("password")} type="password" className={`w-full mt-1 bg-surface border rounded-xl px-4 py-3 focus:outline-none ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-line focus:border-cyan'}`} />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-ink bg-cyan hover:bg-cyan-600 focus:outline-none disabled:opacity-50">
            {loading ? "Création en cours..." : "Créer mon compte"}
          </button>
        </form>
      </div>
    </div>
  );
}
