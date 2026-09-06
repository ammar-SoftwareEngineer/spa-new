import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "name_min"),
  email: z.string().trim().email("email_invalid"),
  phone: z.string().trim().optional(),
  subject: z.string().trim().min(2, "subject_min").optional(),
  message: z.string().trim().min(10, "message_min"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
