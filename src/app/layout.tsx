import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";
import { MaintenanceGuardian } from "@/components/maintenance-guardian";
import { SupportChatWidget } from "@/components/support-chat-widget";
import { MaintenanceOverlay } from "@/components/maintenance-overlay";
import { AnnouncementBanner } from "@/components/announcement-banner";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
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
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased flex flex-col min-h-screen`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>
            <MaintenanceGuardian>
              <AnnouncementBanner />
              <div className="flex-1 flex flex-col relative">
                <MaintenanceOverlay />
                {children}
              </div>
            </MaintenanceGuardian>
          </AuthProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: { fontFamily: 'var(--font-outfit)', fontWeight: 700, fontSize: '13px', borderRadius: '16px', padding: '14px 18px' },
              success: { style: { background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0' } },
              error: { style: { background: '#fff1f2', color: '#9f1239', border: '1px solid #fecdd3' } },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
