import type { Metadata } from "next";

import "@/app/globals.css";
import QueryProvider from "@/components/providers/query-provider";
import { geistSans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "infer.io",
  description: "Infer your spreadsheet data types with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
