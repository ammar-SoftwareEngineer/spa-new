import { apiPost } from "@/api/client";

export type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
};

export function sendContactData(formData: ContactFormData) {
  return apiPost("/contact-us", formData);
}
