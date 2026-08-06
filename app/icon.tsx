import { ImageResponse } from "next/og";

// Generated favicon — a green tile with the wordmark's leading K. There was no
// icon at all before, so browsers fell back to the blank-page glyph.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#34A853",
          color: "#FFFFFF",
          fontSize: 46,
          fontWeight: 800,
          borderRadius: 14,
        }}
      >
        K
      </div>
    ),
    size,
  );
}
