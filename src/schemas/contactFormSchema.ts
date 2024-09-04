import { z } from 'zod';

export const contactFormSchema = z.object({
  nom: z.string().min(1, { message: "Le nom est requis" }),
  email: z.string().email({ message: "Email invalide" }),
  message: z.string().min(1, { message: "Le message est requis" }),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;
