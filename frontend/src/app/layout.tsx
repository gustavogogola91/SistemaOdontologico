import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "@/components/ui/Header";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Sistema Odontológico",
  description: "Sistema para gestão de Clinícas Odontológicas",
  icons: {
    icon: '/Icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${inter.className} antialiased`}
      >
        <AuthProvider>
          <Header />
          <main>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
