import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import SessionWrapper from "@/components/SessionWrapper";

const inter = Inter({ subsets: ["latin"],  display: "swap",
});

export const metadata: Metadata = {
  title: "Concesionaria | Inicio",
  description: "Encontrá el auto de tus sueños al mejor precio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </SessionWrapper>
  );
}
