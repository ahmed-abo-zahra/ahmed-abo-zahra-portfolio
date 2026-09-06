import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><p className="eyebrow">404</p><h1>This page wandered off.</h1><p>The work is still waiting for you.</p><Link className="button button-primary" href="/">Back home <span aria-hidden="true">↗</span></Link></main>;
}
