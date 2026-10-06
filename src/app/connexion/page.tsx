"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations";
import type { z } from "zod";

type LoginInput = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setLoading(true);
    setErrorMsg("");
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: data.email, password: data.password });
    if (signInError) {
      setErrorMsg(signInError.message);
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
          <h2 className="text-center text-3xl font-bold text-ink">Connexion</h2>
          <p className="mt-2 text-center text-sm text-slate">
            Nouveau client ?{" "}
            <Link href="/inscription" className="font-medium text-cyan-700 hover:text-cyan-800 transition-colors">Créer un compte</Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {errorMsg && <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">{errorMsg}</div>}
          <div>
            <label className="text-sm font-medium text-ink">Email</label>
            <input {...register("email")} type="email" className={`w-full mt-1 bg-surface border rounded-xl px-4 py-3 focus:outline-none ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-line focus:border-cyan'}`} />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-ink">Mot de passe</label>
              <Link href="/mot-de-passe-oublie" className="text-sm font-medium text-cyan-700 hover:text-cyan-800 transition-colors">Oublié ?</Link>
            </div>
            <input {...register("password")} type="password" className={`w-full mt-1 bg-surface border rounded-xl px-4 py-3 focus:outline-none ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-line focus:border-cyan'}`} />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-ink bg-cyan hover:bg-cyan-600 focus:outline-none disabled:opacity-50">
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
