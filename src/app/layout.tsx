import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI UI Reviewer",
  description: "Get instant UI, accessibility, and code feedback",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
  return (
    <html lang="en">
      <body className={`antialiased bg-gray-950 text-gray-100`}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
