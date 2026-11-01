import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

export const viewport: Viewport = {
  themeColor: "#000d10",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Abrahan Rondon | Ingeniero en Electrónica & Telecomunicaciones 5G | rondontech.com",
  description:
    "Perfil profesional de Abrahan Rondon. Telecomunicaciones móviles 5G/LTE/RF, transmisión de datos, energía crítica, domótica y seguridad electrónica (Ablu Tech) y automatización con Inteligencia Artificial.",
  keywords: [
    "Abrahan Rondon",
    "rondontech",
    "Ablu Tech",
    "Ingeniero Electronico Chile",
    "Telecomunicaciones 5G",
    "Redes Moviles Entel",
    "Domotica Santiago",
    "CCTV Seguridad",
    "Automatizacion con IA",
    "Antigravity AI",
  ],
  authors: [{ name: "Abrahan Isaac Rondon Arteaga" }],
  creator: "Abrahan Rondon",
  metadataBase: new URL("https://rondontech.com"),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/brand/rondontech-icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/rondontech-icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/brand/rondontech-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/brand/rondontech-icon-192.png", sizes: "192x192", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Abrahan Rondon | Ingeniero en Electrónica & Telecomunicaciones 5G",
    description:
      "Telecomunicaciones críticas 5G/RF, soluciones de domótica en Ablu Tech y automatizaciones avanzadas asistidas por IA. Santiago, Chile.",
    url: "https://rondontech.com",
    siteName: "RondonTech",
    locale: "es_CL",
    type: "website",
    images: [
      {
        url: "/media/hero-orbital-poster.jpg",
        width: 1024,
        height: 571,
        alt: "RondonTech — Beyond Infrastructure Orbital Presentation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abrahan Rondon | Ingeniero en Electrónica & Telecomunicaciones",
    description: "Telecomunicaciones 5G/RF, IoT y Automatización con IA.",
    images: ["/media/hero-orbital-poster.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#fbfbfd] text-[#000d10] antialiased selection:bg-[#bc7155]/25 selection:text-[#000d10]">
        {children}
      </body>
    </html>
  );
}
