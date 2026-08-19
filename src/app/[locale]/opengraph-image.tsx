import { ImageResponse } from "next/og";

export const alt = "Thierry de Lucas, concert violinist";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const subtitle =
    locale === "pt" ? "Violinista concertista" : "Concert Violinist";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          backgroundColor: "#0B0B0B",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              color: "#FAFAFA",
              fontSize: 72,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Thierry de Lucas
          </div>
          <div
            style={{
              color: "#A1A1A1",
              fontSize: 32,
              fontStyle: "italic",
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
