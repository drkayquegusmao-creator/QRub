import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";
import { MaintenanceGuardian } from "@/components/maintenance-guardian";
import { SupportChatWidget } from "@/components/support-chat-widget";
import { MaintenanceOverlay } from "@/components/maintenance-overlay";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://q-rub.vercel.app"),
  title: "QRub | Plataforma de Questões de Alta Performance",
  description: "A plataforma definitiva para sua aprovação. Inteligência Artificial, SRS e questões comentadas.",
  openGraph: {
    title: "QRub | Domine seus Exames",
    description: "Prepare-se com a melhor tecnologia educacional do mercado.",
    url: "https://q-rub.vercel.app",
    siteName: "QRub",
    images: [
      {
        url: "/qrub_premium_logo_3d.jpg",
        width: 1200,
        height: 630,
        alt: "QRub Logo",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QRub | Plataforma de Questões",
    description: "A tecnologia que acelera sua aprovação.",
    images: ["/qrub_premium_logo_3d.jpg"],
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>
            <MaintenanceGuardian>
              <MaintenanceOverlay />
              {children}
            </MaintenanceGuardian>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
