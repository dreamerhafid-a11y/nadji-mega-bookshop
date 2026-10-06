import { z } from "zod";

export const checkoutSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit faire au moins 2 caractères").max(50),
  lastName: z.string().min(2, "Le nom doit faire au moins 2 caractères").max(50),
  phone: z.string().regex(/^(05|06|07)[0-9]{8}$/, "Numéro de téléphone algérien invalide (ex: 0555000000)"),
  email: z.string().email("Format d'email invalide").optional().or(z.literal("")),
  wilaya: z.string().min(1, "Veuillez sélectionner une wilaya"),
  city: z.string().min(2, "Commune requise").max(50),
  address: z.string().min(5, "Adresse trop courte").max(200),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

export const registerSchema = loginSchema.extend({
  firstName: z.string().min(2, "Prénom requis").max(50),
  lastName: z.string().min(2, "Nom requis").max(50),
});
