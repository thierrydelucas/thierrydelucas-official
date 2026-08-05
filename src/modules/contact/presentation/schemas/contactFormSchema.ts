import { z } from "zod";

export function createContactFormSchema(messages: {
  required: string;
  email: string;
}) {
  return z.object({
    name: z.string().min(1, messages.required),
    email: z.string().min(1, messages.required).email(messages.email),
    message: z.string().min(1, messages.required),
  });
}

export type ContactFormValues = z.infer<
  ReturnType<typeof createContactFormSchema>
>;
