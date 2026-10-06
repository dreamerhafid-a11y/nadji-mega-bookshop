"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Save, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function StorefrontEditorClient({ initialConfig }: { initialConfig: any }) {
  const [config, setConfig] = useState(initialConfig || {
    name: "Ma Boutique",
    theme_primary: "#16E0F5",
    theme_ink: "#080808",
    theme_accent: "#F27A24",
    theme_radius: "2rem",
    menu_links: [{ label: "Boutique", href: "/boutique" }]
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSave = async () => {
    setIsSaving(true);
    await supabase.from('storefront_config').update({
      name: config.name,
      theme_primary: config.theme_primary,
      theme_ink: config.theme_ink,
      theme_accent: config.theme_accent,
      theme_radius: config.theme_radius,
      menu_links: config.menu_links
    }).eq('id', config.id || '00000000-0000-0000-0000-000000000000');
    
    setIsSaving(false);
    // Force a full refresh to re-apply root layout CSS vars
    window.location.href = '/admin/storefront'; 
  };

  const updateMenu = (index: number, field: 'label' | 'href', value: string) => {
    const newMenu = [...config.menu_links];
    newMenu[index][field] = value;
    setConfig({ ...config, menu_links: newMenu });
  };

  const removeMenu = (index: number) => {
    const newMenu = config.menu_links.filter((_: any, i: number) => i !== index);
    setConfig({ ...config, menu_links: newMenu });
  };

  const addMenu = () => {
    setConfig({ ...config, menu_links: [...config.menu_links, { label: "Nouveau", href: "/" }] });
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-line shadow-sm space-y-8">
      
      {/* IDENTITÉ */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold border-b border-line pb-2">Identité</h2>
        <div>
          <label className="block text-sm font-bold mb-1">Nom de la boutique</label>
          <input type="text" value={config.name} onChange={(e) => setConfig({...config, name: e.target.value})} className="w-full border border-line rounded-xl px-4 py-2" />
        </div>
      </section>

      {/* THEME */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold border-b border-line pb-2">Thème et Couleurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-bold mb-1">Couleur Principale</label>
            <div className="flex gap-3 items-center">
              <input type="color" value={config.theme_primary} onChange={(e) => setConfig({...config, theme_primary: e.target.value})} className="w-12 h-12 rounded-lg cursor-pointer" />
              <input type="text" value={config.theme_primary} onChange={(e) => setConfig({...config, theme_primary: e.target.value})} className="flex-1 border border-line rounded-xl px-4 py-2 uppercase" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Couleur Accent (ex: Boutons Secondaires)</label>
            <div className="flex gap-3 items-center">
              <input type="color" value={config.theme_accent} onChange={(e) => setConfig({...config, theme_accent: e.target.value})} className="w-12 h-12 rounded-lg cursor-pointer" />
              <input type="text" value={config.theme_accent} onChange={(e) => setConfig({...config, theme_accent: e.target.value})} className="flex-1 border border-line rounded-xl px-4 py-2 uppercase" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Couleur Sombre (Header/Texte)</label>
            <div className="flex gap-3 items-center">
              <input type="color" value={config.theme_ink} onChange={(e) => setConfig({...config, theme_ink: e.target.value})} className="w-12 h-12 rounded-lg cursor-pointer" />
              <input type="text" value={config.theme_ink} onChange={(e) => setConfig({...config, theme_ink: e.target.value})} className="flex-1 border border-line rounded-xl px-4 py-2 uppercase" />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <label className="block text-sm font-bold mb-1">Rayon des bordures (Border Radius)</label>
          <select value={config.theme_radius} onChange={(e) => setConfig({...config, theme_radius: e.target.value})} className="w-full md:w-1/3 border border-line rounded-xl px-4 py-2">
            <option value="0rem">Carré (0rem)</option>
            <option value="0.5rem">Léger (0.5rem)</option>
            <option value="1rem">Moyen (1rem)</option>
            <option value="2rem">Arrondi (2rem)</option>
            <option value="3rem">Pillule (3rem)</option>
          </select>
        </div>
      </section>

      {/* NAVIGATION */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold border-b border-line pb-2 flex justify-between items-center">
          Navigation (Header)
          <button onClick={addMenu} className="text-sm bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full flex items-center gap-1 hover:bg-cyan-200"><Plus className="w-4 h-4"/> Ajouter</button>
        </h2>
        
        <div className="space-y-3">
          {config.menu_links.map((link: any, index: number) => (
            <div key={index} className="flex gap-3 items-center bg-surface p-3 rounded-xl border border-line">
              <input type="text" placeholder="Label (ex: Boutique)" value={link.label} onChange={(e) => updateMenu(index, 'label', e.target.value)} className="flex-1 border border-line rounded-lg px-3 py-2" />
              <input type="text" placeholder="Lien (ex: /boutique)" value={link.href} onChange={(e) => updateMenu(index, 'href', e.target.value)} className="flex-1 border border-line rounded-lg px-3 py-2" />
              <button onClick={() => removeMenu(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-5 h-5"/></button>
            </div>
          ))}
        </div>
      </section>

      {/* SAVE */}
      <div className="pt-6 border-t border-line flex justify-end">
        <button onClick={handleSave} disabled={isSaving} className="bg-ink text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-cyan hover:text-ink transition-colors disabled:opacity-50">
          <Save className="w-5 h-5" /> {isSaving ? "Sauvegarde..." : "Enregistrer les modifications"}
        </button>
      </div>

    </div>
  );
}
