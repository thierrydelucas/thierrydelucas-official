"use client";

import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Button from "@/src/shared/presentation/components/Button";
import TextField from "@/src/shared/presentation/components/TextField";
import {
  createContactFormSchema,
  type ContactFormValues,
} from "@/src/modules/contact/presentation/schemas/contactFormSchema";
import { sendContactMessage } from "@/src/modules/contact/presentation/actions/sendContactMessage";

type ContactFormProps = {
  labels: {
    name: string;
    email: string;
    message: string;
  };
  submitLabel: string;
  errorMessages: {
    required: string;
    email: string;
  };
  toastMessages: {
    success: {
      title: string;
      description: string;
    };
    error: {
      title: string;
      description: string;
    };
  };
};

export default function ContactForm({
  labels,
  submitLabel,
  errorMessages,
  toastMessages,
}: ContactFormProps) {
  const schema = useMemo(
    () => createContactFormSchema(errorMessages),
    [errorMessages],
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const isSubmitDisabled = isSubmitting || !isValid;

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const result = await sendContactMessage(data);

      if (!result.ok) {
        toast.error(toastMessages.error.title, {
          description: toastMessages.error.description,
        });
        return;
      }

      toast.success(toastMessages.success.title, {
        description: toastMessages.success.description,
      });
      reset();
    } catch (error) {
      toast.error(toastMessages.error.title, {
        description: toastMessages.error.description,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-10 md:gap-12"
      noValidate
    >
      <div className="flex flex-col gap-10 md:grid md:grid-cols-2 md:gap-x-16 md:gap-y-12">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              label={labels.name}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
              disabled={isSubmitting}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              label={labels.email}
              name={field.name}
              type="email"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
              disabled={isSubmitting}
            />
          )}
        />

        <Controller
          name="message"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              label={labels.message}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
              disabled={isSubmitting}
              multiline
              className="md:col-span-2"
            />
          )}
        />
      </div>

      <div className="flex justify-center pt-2 md:pt-4">
        <Button
          title={submitLabel}
          type="submit"
          variant="solid"
          disabled={isSubmitDisabled}
          isLoading={isSubmitting}
          className="w-full max-w-sm md:w-auto md:min-w-60"
        />
      </div>
    </form>
  );
}
