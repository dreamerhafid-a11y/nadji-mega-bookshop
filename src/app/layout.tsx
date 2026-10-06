import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Boutique E-commerce",
  description: "Propulsé par Antigravity",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: config } = await supabase.from('storefront_config').select('*').single();

  const themePrimary = config?.theme_primary || '#FF2A70';
  const themeInk = config?.theme_ink || '#080808';
  const themeAccent = config?.theme_accent || '#6C5CE7';
  const themeRadius = config?.theme_radius || '2rem';

  return (
    <html lang="fr">
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --color-cyan: ${themePrimary};
            --color-orange: ${themeAccent};
            --color-ink: ${themeInk};
            --radius-3xl: ${themeRadius};
            --radius-2xl: calc(${themeRadius} * 0.75);
            --radius-xl: calc(${themeRadius} * 0.5);
            --radius-lg: calc(${themeRadius} * 0.3);
          }
        `}} />
      </head>
      <body>
        <Header menuLinks={config?.menu_links} storeName={config?.name} />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
