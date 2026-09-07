"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendMessage, type ContactState } from "@/app/contact-action";

const initialState: ContactState = { status: "idle", message: "" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendMessage, initialState);
  // Stamped after mount, so the server can tell a typed message from an instant one.
  const openedAt = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (openedAt.current) openedAt.current.value = String(Date.now());
  }, []);

  return (
    <form className="contact-form" action={formAction}>
      <p className="eyebrow">Or send it from here</p>
      <div className="contact-field">
        <label htmlFor="contact-name">Your name</label>
        <input id="contact-name" name="name" type="text" autoComplete="name" maxLength={80} required />
      </div>
      <div className="contact-field">
        <label htmlFor="contact-email">Your email</label>
        <input id="contact-email" name="email" type="email" autoComplete="email" maxLength={140} required />
      </div>
      <div className="contact-field">
        <label htmlFor="contact-message">What are you building?</label>
        <textarea id="contact-message" name="message" rows={4} maxLength={2000} required />
      </div>
      <input ref={openedAt} type="hidden" name="openedAt" defaultValue="" />
      <div className="contact-trap" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <button className="button button-light" type="submit" disabled={pending}>
        {pending ? "Sending…" : "Send this message"}
      </button>
      <p className={`contact-status is-${state.status}`} role="status" aria-live="polite">{state.message}</p>
    </form>
  );
}
