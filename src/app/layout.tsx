// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from "react";
import {StoreProvider} from "@/app/providers";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Weather App',
    description: 'Your weather app with Redux',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <StoreProvider>
            {children}
        </StoreProvider>
        </body>
        </html>
    );
}
