import { z } from "zod";

export const CONTACT_FIELD_LIMITS = {
  name: 100,
  email: 254,
  message: 1000,
} as const;

export function createContactFormSchema(messages: {
  required: string;
  email: string;
  maxLength: string;
}) {
  return z.object({
    name: z
      .string()
      .min(1, messages.required)
      .max(CONTACT_FIELD_LIMITS.name, messages.maxLength),
    email: z
      .string()
      .min(1, messages.required)
      .max(CONTACT_FIELD_LIMITS.email, messages.maxLength)
      .email(messages.email),
    message: z
      .string()
      .min(1, messages.required)
      .max(CONTACT_FIELD_LIMITS.message, messages.maxLength),
  });
}

export type ContactFormValues = z.infer<
  ReturnType<typeof createContactFormSchema>
>;
