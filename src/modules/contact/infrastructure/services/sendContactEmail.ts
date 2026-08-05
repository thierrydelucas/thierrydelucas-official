import { resend } from "@/src/modules/contact/infrastructure/services/resendClient";
import type { ContactFormValues } from "@/src/modules/contact/presentation/schemas/contactFormSchema";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function sendContactEmail(payload: ContactFormValues) {
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!process.env.RESEND_API_KEY) {
    return { data: null, error: { message: "Missing RESEND_API_KEY" } };
  }

  if (!to || !from) {
    return {
      data: null,
      error: { message: "Missing CONTACT_TO_EMAIL or RESEND_FROM_EMAIL" },
    };
  }

  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safeMessage = escapeHtml(payload.message).replaceAll("\n", "<br />");

  return resend.emails.send({
    from,
    to: [to],
    replyTo: payload.email,
    subject: `Nova mensagem de contato — ${payload.name}`,
    html: `
      <div style="margin:0;padding:0;background:#f7f7f5;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f7f7f5;">
          <tr>
            <td align="center" style="padding:48px 20px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;background:#ffffff;border:1px solid #ecece8;">
                <tr>
                  <td style="padding:40px 36px 32px;border-bottom:1px solid #ecece8;">
                    <p style="margin:0 0 8px;font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:1.3;letter-spacing:0.02em;color:#111111;">
                      Nova mensagem
                    </p>
                    <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#8a8a8a;">
                      Contato do site
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:32px 36px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding:0 0 20px;">
                          <p style="margin:0 0 6px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#8a8a8a;">
                            Nome
                          </p>
                          <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.5;color:#1a1a1a;">
                            ${safeName}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 0 20px;">
                          <p style="margin:0 0 6px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#8a8a8a;">
                            Email
                          </p>
                          <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.5;">
                            <a href="mailto:${safeEmail}" style="color:#1a1a1a;text-decoration:none;border-bottom:1px solid #d4d4d0;">${safeEmail}</a>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0;">
                          <p style="margin:0 0 6px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#8a8a8a;">
                            Mensagem
                          </p>
                          <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#1a1a1a;">
                            ${safeMessage}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 36px 28px;border-top:1px solid #ecece8;">
                    <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.08em;color:#a3a3a3;">
                      Responda este email para falar com ${safeName}.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    `,
  });
}
