import { ImageResponse } from "next/og";

export const alt = "Ahmed Abo Zahra — Full-Stack Web Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 70, background: "#EAE4D8", color: "#183C32" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26 }}><span>AZ</span><span>ahmedabozahra.me</span></div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ fontSize: 76, letterSpacing: -3 }}>Ahmed Abo Zahra</div>
        <div style={{ fontSize: 34 }}>Full-Stack Web Developer</div>
      </div>
      <div style={{ borderTop: "2px solid #796039", paddingTop: 26, fontSize: 24 }}>Thoughtfully built. Beautifully felt.</div>
    </div>,
    size,
  );
}
