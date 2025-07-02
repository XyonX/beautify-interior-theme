"use client";
import "../globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body className="min-h-screen bg-white">
        {/* Auth Header */}
        <header className="border-b border-stone-100 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-12 h-12">
                  <img
                    src={`${process.env.NEXT_PUBLIC_CDN_URL}/site-data/BI.svg`}
                    alt="BeautifyInterior Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-lg font-medium text-stone-800 hidden sm:block">
                  BeautifyInterior
                </span>
              </Link>

              {/* Auth Actions */}
              <div className="flex items-center space-x-3">
                <Link href="/auth/login">
                  <Button
                    variant="ghost"
                    className="text-stone-700 hover:text-stone-900 hover:bg-stone-50 text-sm font-medium"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="bg-stone-800 hover:bg-stone-700 text-white text-sm font-medium px-4 py-2">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
