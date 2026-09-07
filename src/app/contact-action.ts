"use server";

export type ContactState = { status: "idle" | "sent" | "error"; message: string };

const LIMITS = { name: 80, email: 140, message: 2000 };

function clean(value: FormDataEntryValue | null, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

export async function sendMessage(_previous: ContactState, formData: FormData): Promise<ContactState> {
  const accessKey = process.env.CONTACT_FORM_KEY;
  if (!accessKey) return { status: "error", message: "The form is not configured yet. Please use the email address above." };

  // Bots fill hidden fields humans never see, and they submit faster than anyone can type.
  if (clean(formData.get("company"), 100)) return { status: "sent", message: "Thanks — your message is on its way." };
  const openedAt = Number(formData.get("openedAt"));
  if (openedAt && Date.now() - openedAt < 2000) return { status: "error", message: "That was too quick. Please try again." };

  const name = clean(formData.get("name"), LIMITS.name);
  const email = clean(formData.get("email"), LIMITS.email);
  const message = clean(formData.get("message"), LIMITS.message);

  if (!name || !email || !message) return { status: "error", message: "Please fill in your name, email, and message." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return { status: "error", message: "That email address does not look right." };
  if (message.length < 10) return { status: "error", message: "Please add a little more detail so I can reply usefully." };

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Portfolio enquiry from ${name}`,
        from_name: "ahmedabozahra.me",
        replyto: email,
        name,
        email,
        message,
      }),
    });
    if (!response.ok) throw new Error(`Form endpoint returned ${response.status}`);
  } catch {
    return { status: "error", message: "The message could not be sent. Please email me directly instead." };
  }

  return { status: "sent", message: "Thanks — your message is on its way. I'll reply from my email." };
}
