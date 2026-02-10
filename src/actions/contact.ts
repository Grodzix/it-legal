"use server";

export interface ContactFormState {
  success: boolean;
  error: string | null;
  fieldErrors: Record<string, string>;
}

// TODO: Rate limiting — dodać po wdrożeniu backendu (np. Cloudflare Workers KV)

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

  // Name: 2–100 chars
  if (!name || name.length < 2) {
    fieldErrors.name = "Podaj imię i nazwisko (min. 2 znaki)";
  } else if (name.length > 100) {
    fieldErrors.name = "Imię i nazwisko: max. 100 znaków";
  }

  // Email: valid format, max 254 chars (RFC 5321)
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = "Podaj prawidłowy adres e-mail";
  } else if (email.length > 254) {
    fieldErrors.email = "Adres e-mail: max. 254 znaki";
  }

  // Phone (optional): strip non-digits, check 7–15 digits (E.164)
  if (phone) {
    const digitsOnly = phone.replace(/\D/g, "");
    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      fieldErrors.phone = "Podaj prawidłowy numer telefonu (7–15 cyfr)";
    } else if (!/^[+\d\s()-]{7,20}$/.test(phone)) {
      fieldErrors.phone = "Numer telefonu zawiera niedozwolone znaki";
    }
  }

  // Message: 10–2000 chars
  if (!message || message.length < 10) {
    fieldErrors.message = "Wiadomość musi mieć min. 10 znaków";
  } else if (message.length > 2000) {
    fieldErrors.message = "Wiadomość: max. 2000 znaków";
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
