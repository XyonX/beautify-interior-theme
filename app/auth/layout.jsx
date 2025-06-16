// "use client";
// import "../globals.css";

// export default function AdminLayout({ children }) {
//   return (
//     <html lang="en">
//       <head></head>

//       <body className="min-h-screen w-screen bg-white  ">{children}</body>
//     </html>
//   );
// }
"use client";
import "../globals.css";

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body className="min-h-screen bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </body>
    </html>
  );
}
