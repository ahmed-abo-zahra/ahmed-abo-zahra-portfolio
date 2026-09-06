type IconName = "email" | "whatsapp" | "linkedin" | "github" | "chat";

export default function ContactIcon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    email: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>,
    chat: <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 10 10 0 0 1-4-.9L3 21l1.9-5.5a10 10 0 0 1-.9-4A8.5 8.5 0 0 1 12.5 3H13a8.5 8.5 0 0 1 8 8v.5Z" />,
    whatsapp: <><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.8a8.5 8.5 0 1 1 16.2-4Z" /><path d="m8.2 7.2 1.3 2.5-1 1.1c.9 1.8 2 2.9 3.9 3.8l1.1-1 2.5 1.3c-.4 1.6-1.2 2.2-2.7 1.8-3.8-1-6.2-3.4-7.1-7.1-.3-1.3.3-2.1 2-2.4Z" /></>,
    linkedin: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7.5 10v7M7.5 7v.1M11 17v-7m0 3a3 3 0 0 1 6 0v4" /></>,
    github: <path d="M9 19c-4.3 1.3-4.3-2.2-6-2.7M15 22v-3.4c.1-1-.3-1.8-.8-2.3 2.7-.3 5.5-1.3 5.5-6a4.7 4.7 0 0 0-1.3-3.3 4.3 4.3 0 0 0-.1-3.3s-1-.3-3.5 1.3a12 12 0 0 0-6.4 0C6 3.4 4.9 3.7 4.9 3.7a4.3 4.3 0 0 0-.1 3.3 4.7 4.7 0 0 0-1.3 3.3c0 4.7 2.8 5.7 5.5 6-.5.5-.8 1.3-.8 2.3V22" />,
  };
  return <svg className="contact-icon" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{paths[name]}</svg>;
}
