INSERT INTO products (id, slug, name, category, brand, description, price, stock, images) VALUES 
('11111111-1111-1111-1111-111111111111', 'sac-a-dos-kaya', 'Sac à Dos Premium Kaya', 'fournitures-scolaires', 'KAYA', 'Sac à dos ergonomique, parfait pour les étudiants et les créatifs.', 8500, 50, '["/sac_a_dos_kaya_1789920728851.jpg"]'),
('22222222-2222-2222-2222-222222222222', 'cahier-notes-cuir', 'Cahier de Notes en Cuir Vegan', 'papeterie', 'KAYA', 'Un magnifique carnet A5 avec une couverture en cuir vegan souple.', 2900, 200, '["/cahier_notes_cuir_1789920764041.jpg"]'),
('33333333-3333-3333-3333-333333333333', 'pack-feutres-copic', 'Pack de Feutres Copic (Set de 12)', 'arts-creativite', 'Copic', 'Le set indispensable pour les illustrateurs et designers.', 14500, 15, '["/pack_feutres_copic_1789920748150.jpg"]'),
('44444444-4444-4444-4444-444444444444', 'agenda-kaya-2026', 'Agenda KAYA 2026 Minimaliste', 'bureau', 'KAYA', 'Planifiez votre année avec clarté.', 3200, 300, '["/placeholder.jpg"]')
ON CONFLICT (slug) DO UPDATE SET 
    name = EXCLUDED.name,
    price = EXCLUDED.price,
    images = EXCLUDED.images;
