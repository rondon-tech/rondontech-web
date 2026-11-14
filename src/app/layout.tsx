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
  title:
    "Abrahan Rondon | Telecom 5G/RF, Infraestructura Datacenter, Inmótica & Agentes IA | rondontech.com",
  description:
    "Portafolio ejecutivo y B2B de Abrahan Isaac Rondon Arteaga. +10 años en Telecomunicaciones 5G/LTE/RF e infraestructura crítica (Entel, Ericsson, Huawei), junto a soluciones de Inmótica, Domótica, CCTV IP y Sistemas Multi-Agente con IA en Ablu Tech Ltda. (Santiago, Chile).",
  keywords: [
    "Abrahan Rondon",
    "Abrahan Isaac Rondon Arteaga",
    "rondontech",
    "Ablu Tech Ltda",
    "Ingeniero Electronica Telecomunicaciones Chile",
    "Telecomunicaciones 5G RF",
    "Infraestructura Critica Datacenter Energia AC DC",
    "Entel Redes Moviles O&M",
    "Inmotica Domotica Santiago Chile",
    "Seguridad Electronica CCTV IP",
    "Sistemas Multi-Agente IA",
    "Automatizacion Inteligente B2B",
  ],
  authors: [{ name: "Abrahan Isaac Rondon Arteaga", url: "https://rondontech.com" }],
  creator: "Abrahan Isaac Rondon Arteaga",
  metadataBase: new URL("https://rondontech.com"),
  alternates: {
    canonical: "https://rondontech.com",
  },
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
    title:
      "Abrahan Rondon | Ingeniería Telecom 5G/RF, Datacenter, Inmótica & Sistemas IA",
    description:
      "Liderazgo técnico en redes móviles 5G/RF e infraestructura crítica (Entel) + Dirección de Operaciones en Ablu Tech Ltda.: edificios inteligentes, seguridad electrónica y automatización con agentes autónomos de IA.",
    url: "https://rondontech.com",
    siteName: "RondonTech",
    locale: "es_CL",
    type: "website",
    images: [
      {
        url: "/media/hero-orbital-poster.jpg",
        width: 1024,
        height: 571,
        alt: "RondonTech — Abrahan Rondon | Telecom 5G, Inmótica y Sistemas IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abrahan Rondon | Telecom 5G/RF, Inmótica & Agentes IA",
    description:
      "Infraestructura crítica 5G/RF, Inmótica en Ablu Tech Ltda. y automatización con sistemas multi-agente de IA. Santiago, Chile.",
    images: ["/media/hero-orbital-poster.jpg"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://ablutech.com/#organization",
      name: "Ablu Tech Ltda.",
      url: "https://ablutech.com",
      email: "arondon@ablutech.com",
      telephone: "+56 9 6552 9637",
      description:
        "Soluciones integrales de domótica e inmótica de alto estándar, videovigilancia IP (CCTV) con analítica, control de acceso y automatización empresarial con agentes autónomos de Inteligencia Artificial.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Santiago",
        addressCountry: "CL",
      },
      founder: {
        "@id": "https://rondontech.com/#person",
      },
    },
    {
      "@type": "Person",
      "@id": "https://rondontech.com/#person",
      name: "Abrahan Isaac Rondon Arteaga",
      alternateName: "Abrahan Rondon",
      url: "https://rondontech.com",
      image: "https://rondontech.com/media/hero-orbital-poster.jpg",
      jobTitle:
        "Ingeniero en Electrónica & Automatización | Fundador y Director de Operaciones en Ablu Tech Ltda.",
      description:
        "Ingeniero en Electrónica mención Control y TSU en Informática con más de 10 años de trayectoria en operación y mantenimiento de redes móviles 5G/LTE/RF, transmisión y energía crítica (Entel Connect Center Chile), y Fundador & Director de Operaciones en Ablu Tech Ltda. (domótica, inmótica, CCTV IP y agentes de IA).",
      email: "arondon@ablutech.com",
      telephone: "+56 9 6552 9637",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Santiago",
        addressCountry: "CL",
      },
      sameAs: [
        "https://www.linkedin.com/in/ingeniero-abrahan-rondon/",
        "https://ablutech.com",
      ],
      worksFor: [
        {
          "@id": "https://ablutech.com/#organization",
        },
        {
          "@type": "Organization",
          name: "Entel Connect Center Chile",
        },
      ],
      alumniOf: [
        {
          "@type": "EducationalOrganization",
          name: "Universidad Nacional Experimental Politécnica de la Fuerza Armada (UNEFA)",
        },
        {
          "@type": "EducationalOrganization",
          name: "Instituto Universitario de Tecnología Dr. Cristóbal Mendoza",
        },
      ],
      knowsAbout: [
        "Telecomunicaciones 5G NR / LTE / RF",
        "Microondas MMOO y Fibra Óptica MPLS",
        "Energía Crítica AC/DC, Rectificadores y UPS",
        "Domótica, Inmótica y Edificios Inteligentes",
        "CCTV IP y Control de Acceso",
        "Agentes Autónomos e Inteligencia Artificial",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#fbfbfd] text-[#000d10] antialiased selection:bg-[#bc7155]/25 selection:text-[#000d10]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
