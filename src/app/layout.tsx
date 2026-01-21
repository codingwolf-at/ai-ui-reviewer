import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "ReviewUI",
    description: "AI-powered UI review tool for frontend developers",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                        (function () {
                        try {
                            const savedTheme = localStorage.getItem("theme");
                            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
                            ? "dark"
                            : "light";
                            const theme = savedTheme || systemTheme;
                            document.documentElement.setAttribute("data-theme", theme);
                        } catch (e) {}
                        })();
                    `,
                }}
            />
            <body className={`antialiased bg-(--app-bg) min-h-screen text-gray-100`}>
                {children}
            </body>
        </html>
    );
};