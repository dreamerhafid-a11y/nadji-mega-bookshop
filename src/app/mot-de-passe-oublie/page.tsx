export default function ForgotPassword() {
  return (
    <div className="container-page py-20 text-center min-h-[70vh]">
      <h1 className="text-3xl font-bold mb-4">Mot de passe oublié</h1>
      <p className="text-slate mb-8">Entrez votre email pour réinitialiser votre mot de passe.</p>
      <input type="email" className="w-full max-w-sm mx-auto bg-surface border border-line rounded-xl px-4 py-3 mb-4 focus:outline-none focus:border-cyan" placeholder="Votre email" />
      <button className="bg-cyan text-ink font-bold px-8 py-3 rounded-xl hover:bg-cyan-600 transition-colors">Réinitialiser</button>
    </div>
  );
}
