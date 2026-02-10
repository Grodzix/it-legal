"use client";

import { useActionState } from "react";
import { submitContactForm, type ContactFormState } from "@/actions/contact";
import { contactData, siteConfig } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

const initialState: ContactFormState = {
  success: false,
  error: null,
  fieldErrors: {},
};

export default function ContactSection() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState
  );

  return (
    <section
      id="kontakt"
      className="py-12 sm:py-16"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ScrollReveal className="text-center mb-16">
          <p className="section-label mb-4">{contactData.sectionLabel}</p>
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark"
          >
            {contactData.heading}
          </h2>
          <p className="mt-4 text-text-medium text-lg max-w-2xl mx-auto">
            {contactData.subheading}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left: contact info */}
          <ScrollReveal direction="left" className="lg:col-span-2">
            <div className="flex flex-col gap-8">
              <div className="glass rounded-2xl p-8 shadow-md">
                <h3 className="text-lg font-semibold text-text-dark mb-6">
                  Dane kontaktowe
                </h3>
                <div className="space-y-5">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-4 text-text-medium hover:text-primary transition-colors group"
                  >
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </span>
                    <span>{siteConfig.email}</span>
                  </a>

                  <a
                    href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-4 text-text-medium hover:text-primary transition-colors group"
                  >
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </span>
                    <span>{siteConfig.phone}</span>
                  </a>

                  <div className="flex items-center gap-4 text-text-medium">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </span>
                    <span>{siteConfig.address}</span>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-8 shadow-md">
                <h3 className="text-lg font-semibold text-text-dark mb-3">
                  Szybka odpowiedź
                </h3>
                <p className="text-text-medium text-sm leading-relaxed">
                  Odpowiadamy na zapytania w ciągu 24 godzin roboczych.
                  Pierwsza konsultacja jest bezpłatna.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: form */}
          <ScrollReveal direction="right" className="lg:col-span-3">
            <div className="glass rounded-2xl p-8 sm:p-10 shadow-md">
              {state.success ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-text-dark mb-2">
                    Dziękujemy!
                  </h3>
                  <p className="text-text-medium">
                    Otrzymaliśmy Twoją wiadomość. Odpowiemy najszybciej jak to
                    możliwe.
                  </p>
                </div>
              ) : (
                <form action={formAction} noValidate>
                  {state.error && (
                    <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700" role="alert">
                      {state.error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-medium text-text-dark mb-2"
                      >
                        Imię i nazwisko *
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        required
                        autoComplete="name"
                        className="w-full rounded-xl border border-bg-medium bg-white/50 px-4 py-3 text-text-dark placeholder:text-text-light focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                        placeholder="Jan Kowalski"
                      />
                      {state.fieldErrors.name && (
                        <p className="mt-1 text-sm text-red-600">{state.fieldErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-medium text-text-dark mb-2"
                      >
                        E-mail *
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        required
                        autoComplete="email"
                        className="w-full rounded-xl border border-bg-medium bg-white/50 px-4 py-3 text-text-dark placeholder:text-text-light focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                        placeholder="jan@firma.pl"
                      />
                      {state.fieldErrors.email && (
                        <p className="mt-1 text-sm text-red-600">{state.fieldErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-5">
                    <label
                      htmlFor="contact-phone"
                      className="block text-sm font-medium text-text-dark mb-2"
                    >
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      autoComplete="tel"
                      className="w-full rounded-xl border border-bg-medium bg-white/50 px-4 py-3 text-text-dark placeholder:text-text-light focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="+48 123 456 789"
                    />
                    {state.fieldErrors.phone && (
                      <p className="mt-1 text-sm text-red-600">{state.fieldErrors.phone}</p>
                    )}
                  </div>

                  <div className="mt-5">
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium text-text-dark mb-2"
                    >
                      Wiadomość *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      className="w-full rounded-xl border border-bg-medium bg-white/50 px-4 py-3 text-text-dark placeholder:text-text-light focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-y"
                      placeholder="Opisz w czym możemy pomóc..."
                    />
                    {state.fieldErrors.message && (
                      <p className="mt-1 text-sm text-red-600">{state.fieldErrors.message}</p>
                    )}
                  </div>

                  <div className="mt-5">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="rodo"
                        value="1"
                        required
                        className="mt-1 w-4 h-4 rounded border-bg-medium text-primary focus:ring-primary"
                      />
                      <span className="text-xs text-text-medium leading-relaxed">
                        {contactData.rodoText}
                      </span>
                    </label>
                    {state.fieldErrors.rodo && (
                      <p className="mt-1 text-sm text-red-600">{state.fieldErrors.rodo}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={pending}
                    className="mt-8 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-10 py-4 text-base font-semibold text-white shadow-lg hover:bg-primary-dark transition-all hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {pending ? (
                      <>
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                          <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                        </svg>
                        Wysyłanie...
                      </>
                    ) : (
                      <>
                        Wyślij wiadomość
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
