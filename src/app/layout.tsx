import type { Metadata, ResolvingMetadata } from "next";
import clsx from "clsx";
import { Nunito, Nunito_Sans } from "next/font/google";
import "./globals.css";

import { createClient } from "@/prismicio";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const nunito_sans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  //

  const client = createClient();

  const page = await client.getSingle("settings");

  return {
    title: page.data.site_title || "Flowrise fallback",
    description:
      page.data.meta_description || "Flowrise is the relaxing app for you.",
    openGraph: {
      images: [
        page.data.og_image.url || "https://picsum.photos/seed/picsum/200/300",
      ],
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={clsx(nunito.variable, nunito_sans.variable)}>
      <body>
        <header>Header !</header>
        {children}
        <footer>footer !</footer>
      </body>
    </html>
  );
}
