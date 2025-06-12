"use client";
import "../globals.css";

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <head></head>

      <body className="min-h-screen bg-white flex  ">{children}</body>
    </html>
  );
}
