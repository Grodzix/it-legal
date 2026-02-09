"use server";

export interface ContactFormState {
  success: boolean;
  error: string | null;
  fieldErrors: Record<string, string>;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();
  const rodo = formData.get("rodo");

  const fieldErrors: Record<string, string> = {};

  if (!name || name.length < 2) {
    fieldErrors.name = "Podaj imię i nazwisko (min. 2 znaki)";
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = "Podaj prawidłowy adres e-mail";
  }

  if (phone && !/^[+\d\s()-]{7,20}$/.test(phone)) {
    fieldErrors.phone = "Podaj prawidłowy numer telefonu";
  }

  if (!message || message.length < 10) {
    fieldErrors.message = "Wiadomość musi mieć min. 10 znaków";
  }

  if (!rodo) {
    fieldErrors.rodo = "Wymagana zgoda na przetwarzanie danych";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, error: null, fieldErrors };
  }

  try {
    // TODO: Integrate with email API (e.g., Resend, SendGrid, Cloudflare Email Workers)
    // Form data: { name, email, phone, message }

    return {
      success: true,
      error: null,
      fieldErrors: {},
    };
  } catch {
    return {
      success: false,
      error: "Wystąpił błąd. Spróbuj ponownie lub skontaktuj się telefonicznie.",
      fieldErrors: {},
    };
  }
}
