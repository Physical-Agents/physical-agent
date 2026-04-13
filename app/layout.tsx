import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Physical Agents - We Build Skilled AI Agents for Manufacturing',
    description: 'Physical AI Infrastructure to turn robots into skilled Agents',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <body className="antialiased">{children}</body>
        </html>
    );
}
