import { getTranslations } from "next-intl/server";
import ContactForm from "@/src/modules/contact/presentation/components/ContactForm";

export default async function ContactContent() {
  const t = await getTranslations("contact");

  return (
    <section className="flex w-full flex-col gap-10 px-6 py-10 text-white md:mx-auto md:max-w-3xl md:gap-14 md:px-8 md:py-16">
      <header className="flex flex-col gap-3 text-left md:items-center md:text-center">
        <h1 className="font-cormorant text-4xl font-normal leading-tight tracking-wide text-neutral-100 md:text-5xl">
          {t("title")}
        </h1>
        <p className="max-w-md font-inter text-sm tracking-[0.08em] text-white md:text-base md:tracking-widest">
          {t("subtitle")}
        </p>
      </header>

      <ContactForm
        labels={{
          name: t("fields.name"),
          email: t("fields.email"),
          message: t("fields.message"),
        }}
        submitLabel={t("submit")}
        errorMessages={{
          required: t("errors.required"),
          email: t("errors.email"),
        }}
        toastMessages={{
          success: {
            title: t("toast.success.title"),
            description: t("toast.success.description"),
          },
          error: {
            title: t("toast.error.title"),
            description: t("toast.error.description"),
          },
        }}
      />
    </section>
  );
}
