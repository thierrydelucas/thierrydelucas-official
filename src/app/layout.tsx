import type { Metadata } from "next";
import "./globals.css";
import Footer from "../shared/presentation/components/Footer";
import { Inter, Cormorant_Garamond } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});
export const metadata: Metadata = {
  title: "Thierry de Lucas | Violinist",
  description:
    "Thierry de Lucas is an internationally renowned concert violinist, celebrated for his performances of classical music worldwide. Explore his biography, concerts, discography, and upcoming performances.",
  keywords: [
    "Thierry de Lucas",
    "Thierry Lucas",
    "violinist",
    "violin",
    "classical music",
    "classical",
    "instrument",
    "artist",
    "concert violinist",
    "international violinist",
    "classical musician",
    "solo violinist",
    "violin recital",
    "orchestra",
    "chamber music",
    "orchestral musician",
  ],
  authors: [{ name: "Thierry de Lucas" }],
  creator: "Thierry de Lucas",
  publisher: "Thierry de Lucas",
  // metadataBase: new URL("https://www.thierrydelucas.com"),
  openGraph: {
    title: "Thierry de Lucas | International Concert Violinist",
    description:
      "Discover the artistry of Thierry de Lucas, an internationally acclaimed violinist performing classical music around the world.",
    // url: "https://www.thierrydelucas.com",
    siteName: "Thierry de Lucas",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/image_1.jpeg",
        width: 1073,
        height: 1518,
        alt: "Thierry de Lucas, international concert violinist, holding his violin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thierry de Lucas | International Concert Violinist",
    description:
      "Internationally acclaimed violinist Thierry de Lucas — classical music, concerts, and performances.",
    images: ["/images/image_1.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="w-full h-full ">
        <div className="flex min-h-screen w-full flex-col">
          <main className="flex-1">{children}</main>
          <footer className="">
            <Footer />
          </footer>
        </div>
      </body>
    </html>
  );
}
