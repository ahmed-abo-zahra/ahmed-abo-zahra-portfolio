"use client";

import { useEffect, useRef, useState } from "react";

type Status = { kind: "idle" | "sending" | "sent" | "error"; message: string };

const ENDPOINT = "https://api.web3forms.com/submit";

export default function ContactForm({ accessKey }: { accessKey: string }) {
  const [status, setStatus] = useState<Status>({ kind: "idle", message: "" });
  // Stamped after mount, so a message typed by a person is distinguishable from an instant post.
  const openedAt = useRef(0);
  useEffect(() => { openedAt.current = Date.now(); }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // A hidden field only a bot fills. Report success so it does not learn to try again.
    if (typeof data.get("botcheck") === "string" && data.get("botcheck")) {
      setStatus({ kind: "sent", message: "Thanks — your message is on its way." });
      form.reset();
      return;
    }
    if (openedAt.current && Date.now() - openedAt.current < 2000) {
      setStatus({ kind: "error", message: "That was too quick. Please try again." });
      return;
    }
    if (String(data.get("message") ?? "").trim().length < 10) {
      setStatus({ kind: "error", message: "Please add a little more detail so I can reply usefully." });
      return;
    }

    setStatus({ kind: "sending", message: "" });
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message ?? "Request failed");
      setStatus({ kind: "sent", message: "Thanks — your message is on its way. I'll reply from my email." });
      form.reset();
    } catch {
      setStatus({ kind: "error", message: "The message could not be sent. Please email me directly instead." });
    }
  }

  return (
    /* The native action keeps the form working if the script never runs; the handler upgrades it in place. */
    <form className="contact-form" action={ENDPOINT} method="POST" onSubmit={submit}>
      <p className="eyebrow">Or send it from here</p>
      <input type="hidden" name="access_key" value={accessKey} />
      <input type="hidden" name="subject" value="New enquiry from ahmedabozahra.me" />
      <input type="hidden" name="from_name" value="ahmedabozahra.me" />
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
      <div className="contact-trap" aria-hidden="true">
        <label htmlFor="contact-botcheck">Leave this field empty</label>
        <input id="contact-botcheck" name="botcheck" type="checkbox" tabIndex={-1} autoComplete="off" />
      </div>
      <button className="button button-light" type="submit" disabled={status.kind === "sending"}>
        {status.kind === "sending" ? "Sending…" : "Send this message"}
      </button>
      <p className={`contact-status is-${status.kind}`} role="status" aria-live="polite">{status.message}</p>
    </form>
  );
}
