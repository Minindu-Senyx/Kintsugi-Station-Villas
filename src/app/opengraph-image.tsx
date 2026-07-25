import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#1C1C1A",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            letterSpacing: 6,
            textTransform: "uppercase",
            fontSize: 20,
            fontWeight: 600,
            color: "#E8B85C",
            marginBottom: 28,
          }}
        >
          Kandy &middot; Trincomalee, Sri Lanka
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Georgia, serif",
            fontSize: 76,
            fontWeight: 700,
            color: "#FAF7F2",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          Kintsugi Station Villas
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 30,
            fontSize: 26,
            color: "rgba(250,247,242,0.75)",
            textAlign: "center",
            maxWidth: 820,
          }}
        >
          Lovingly restored Sri Lankan holiday homes — modern comfort, old
          world charm.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 44,
            width: 120,
            height: 3,
            background: "#E8B85C",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
