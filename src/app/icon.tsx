import { ImageResponse } from "next/og";

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
          background: "#1C1C1A",
          borderRadius: "50%",
        }}
      >
        <span
          style={{
            color: "#E8B85C",
            fontSize: 38,
            fontFamily: "Georgia, serif",
            fontWeight: 700,
            transform: "translateY(-2px)",
          }}
        >
          K
        </span>
      </div>
    ),
    { ...size }
  );
}
