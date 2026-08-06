import { ImageResponse } from "next/og";

// Rendered at build/request time by Satori. This is the card people actually
// see when the link is pasted into WhatsApp, LinkedIn or a Facebook group —
// which is how most of this traffic will arrive.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "KamJob — Ton emploi au Cameroun, en un swipe";

const GREEN = "#34A853";
const RED = "#EA4335";
const YELLOW = "#FBBC05";

export default function OpengraphImage() {
  const wordmark = [
    { c: "K", color: GREEN },
    { c: "a", color: RED },
    { c: "m", color: YELLOW },
    { c: "J", color: GREEN },
    { c: "o", color: RED },
    { c: "b", color: YELLOW },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFFFFF",
          padding: 72,
          position: "relative",
        }}
      >
        {/* Brand wash in the corner, mirroring the hero glow. */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -120,
            width: 620,
            height: 620,
            borderRadius: 999,
            background: "rgba(52,168,83,0.13)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 12,
            display: "flex",
          }}
        >
          <div style={{ flex: 1, background: GREEN }} />
          <div style={{ flex: 1, background: YELLOW }} />
          <div style={{ flex: 1, background: RED }} />
        </div>

        <div style={{ display: "flex", fontSize: 44, fontWeight: 800 }}>
          {wordmark.map(({ c, color }, i) => (
            <span key={i} style={{ color }}>
              {c}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 74,
              fontWeight: 800,
              color: "#202124",
              lineHeight: 1.08,
              letterSpacing: -2,
            }}
          >
            Ton emploi au Cameroun,
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 74,
              fontWeight: 800,
              color: GREEN,
              lineHeight: 1.08,
              letterSpacing: -2,
            }}
          >
            en un swipe.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 30,
              color: "#5F6368",
            }}
          >
            Swipe à droite — ton CV et ta lettre partent chez le recruteur.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, marginBottom: 8 }}>
          {[
            "Gratuit pour postuler",
            "Sans engagement",
            "MTN MoMo & Orange Money",
          ].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                padding: "12px 22px",
                borderRadius: 999,
                background: "#E6F4EA",
                color: "#12693A",
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
