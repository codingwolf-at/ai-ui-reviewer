import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "ReviewUI",
    description: "AI-powered UI review tool for frontend developers",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body className={`antialiased bg-(--app-bg) min-h-screen text-gray-100`}>
                {children}
            </body>
        </html>
    );
};