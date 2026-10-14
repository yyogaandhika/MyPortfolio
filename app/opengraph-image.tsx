import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mhd. Yoga Andhika | Frontend & Creative Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          fontFamily: "system-ui, sans-serif",
          border: "8px solid #18181b",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              fontSize: 32,
              fontWeight: 800,
              letterSpacing: "-1px",
              color: "#ffffff",
              textTransform: "uppercase",
            }}
          >
            YOGA<span style={{ color: "#d4ff32" }}>.</span>
          </div>
          <div
            style={{
              padding: "8px 20px",
              borderRadius: "9999px",
              background: "#18181b",
              border: "1px solid #27272a",
              color: "#d4ff32",
              fontSize: 14,
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Portfolio & Case Studies
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.05,
              letterSpacing: "-2px",
              textTransform: "uppercase",
            }}
          >
            Creative Developer<span style={{ color: "#d4ff32" }}>.</span>
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#a1a1aa",
              maxWidth: "850px",
              lineHeight: 1.4,
            }}
          >
            Crafting fluid web applications with Next.js & GSAP, and bridging modern interfaces with Machine Learning systems.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #27272a",
            paddingTop: "24px",
            color: "#71717a",
            fontSize: 16,
            fontFamily: "monospace",
          }}
        >
          <div>Diskominfo Dumai (SI TUAH) • EduSummarize AI • Product ML</div>
          <div style={{ color: "#d4ff32" }}>open_to_work: true</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
