"use client";

import { useState } from "react";
import { profile } from "@/content/profile";

export default function CopyEmail() {
  const [status, setStatus] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setStatus("Email address copied.");
    } catch {
      setStatus("Select the email address above to copy it, or use Write an email.");
    }
  }
  return <div className="email-copy"><button type="button" onClick={copy}>Copy email<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V4H4v12h4" /></svg></button><span role="status">{status}</span></div>;
}
