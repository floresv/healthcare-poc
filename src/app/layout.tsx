import type { Metadata } from "next";
import NavBar from "../components/NavBar";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: '17 Tech FoodApp',
  description: 'Explore delicious food categories',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <header className="p-4 border-b">
          <NavBar />
        </header>

        <main className="flex-1">
          {children}
        </main>

        <footer className="p-4 border-t">
          <div>
            <p className="text-center text-gray-600">© 2024 17 Tech FoodApp. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
