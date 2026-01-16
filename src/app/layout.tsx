import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "ReviewUI",
    description: "AI-powered UI review tool for frontend developers",
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