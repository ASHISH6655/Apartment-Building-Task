"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        {/* Wrap everything with QueryClientProvider */}
        <QueryClientProvider client={queryClient}>
          <div className="max-w-4xl mx-auto py-6">{children}</div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
