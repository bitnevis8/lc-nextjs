import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Footer from "./components/ui/Footer/Footer";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/ui/Header/Header";
import StructuredData from "./components/StructuredData";

const vazirmatn = Vazirmatn({ 
  subsets: ["arabic"],
  display: 'swap',
  variable: '--font-vazirmatn',
});

export const metadata = {
  title: {
    default: "Laser Clinic LC - کلینیک لیزر",
    template: "%s | Laser Clinic LC"
  },
  description: "Laser Clinic LC | کلینیک تخصصی لیزر موهای زائد با دستگاه‌های به‌روز، اپراتورهای حرفه‌ای و نوبت‌گیری آنلاین.",
  keywords: ["کلینیک لیزر", "Laser Clinic", "لیزر موهای زائد", "رزرو نوبت لیزر", "لیزر بیکینی", "لیزر فول بادی"],
  authors: [{ name: "Laser Clinic LC" }],
  creator: "Laser Clinic LC",
  publisher: "Laser Clinic LC",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://lc.pourdian.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Laser Clinic LC - کلینیک لیزر",
    description: "کلینیک تخصصی لیزر موهای زائد با دستگاه‌های به‌روز و اپراتورهای حرفه‌ای.",
    url: 'https://lc.pourdian.com',
    siteName: 'Laser Clinic LC',
    locale: 'fa_IR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Laser Clinic LC - کلینیک لیزر",
    description: "کلینیک تخصصی لیزر موهای زائد",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <StructuredData />
      </head>
      <body className={`${vazirmatn.className} min-h-screen flex flex-col bg-gray-50`}>
        <AuthProvider>
          {/* Header */}
          <Header />

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
