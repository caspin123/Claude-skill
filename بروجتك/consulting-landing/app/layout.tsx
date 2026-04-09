import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Apex Consulting — Growth Strategy for Small Businesses",
  description: "We help small business owners scale smarter. Strategy, systems, and execution without the enterprise price tag.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#0F172A] text-[#F8FAFC]">
        {children}
      </body>
    </html>
  );
}
