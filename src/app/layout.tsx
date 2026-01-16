import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "ReviewUI",
    description: "Get instant UI, accessibility, and code feedback",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body className={`antialiased bg-gray-950 text-gray-100`}>
                {children}
            </body>
        </html>
    );
};