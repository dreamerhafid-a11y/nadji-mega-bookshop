import { createClient } from "@/lib/supabase/server";
import { StorefrontEditorClient } from "./StorefrontEditorClient";

export default async function StorefrontEditorPage() {
  const supabase = await createClient();
  const { data: config } = await supabase.from('storefront_config').select('*').single();

  return (
    <div className="space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-heading font-extrabold text-ink">Éditeur de Boutique (Storefront)</h1>
        <p className="text-slate">Personnalisez l'identité visuelle et la navigation pour votre client en temps réel.</p>
      </div>

      <StorefrontEditorClient initialConfig={config} />
    </div>
  );
}
