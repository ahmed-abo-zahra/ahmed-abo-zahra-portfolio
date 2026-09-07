"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Africa/Cairo",
});

export default function LocalTime() {
  // Rendered after mount only: the server and the visitor are rarely on the same minute.
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const timer = setInterval(tick, 15000);
    return () => clearInterval(timer);
  }, []);

  return (
    <p className="locale-mark">
      Egypt
      <span className="locale-rule" aria-hidden="true" />
      <span className="locale-time">{time || "     "}</span>
    </p>
  );
}
