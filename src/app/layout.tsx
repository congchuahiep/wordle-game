import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "../styles/globals.css";
import { Header } from "@/components/header";
import { cn } from "@/lib/utils";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-be-vietnam-pro",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wordle with Uy^^n",
  description: "Chơi wordle lẹ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "antialiased w-full h-screen flex flex-col items-center",
          "relative",
          beVietnamPro.variable,
        )}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
