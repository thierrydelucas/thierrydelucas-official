"use server";

import { z } from "zod";
import { sendContactEmail } from "@/src/modules/contact/infrastructure/services/sendContactEmail";
import type { ContactFormValues } from "@/src/modules/contact/presentation/schemas/contactFormSchema";

const contactPayloadSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  message: z.string().trim().min(1),
});

export type SendContactMessageResult =
  | { ok: true }
  | { ok: false; error: string };

export async function sendContactMessage(
  payload: ContactFormValues,
): Promise<SendContactMessageResult> {
  const parsed = contactPayloadSchema.safeParse(payload);

  if (!parsed.success) {
    return { ok: false, error: "Invalid form data" };
  }

  const { data, error } = await sendContactEmail(parsed.data);

  if (error) {
    console.error("[sendContactMessage]", error);
    return { ok: false, error: error.message };
  }

  if (!data) {
    return { ok: false, error: "Failed to send email" };
  }

  return { ok: true };
}
