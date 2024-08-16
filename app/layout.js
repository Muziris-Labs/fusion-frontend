import { Outfit } from "next/font/google";

import "./globals.css";

import { Toaster } from "sonner";

import ReduxProvider from "@/provider/ReduxProvider";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "Fusion",
  description: "Your very own smart wallet",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.className}`}>
        <ReduxProvider>
          <Toaster />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
