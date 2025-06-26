// "use client"

// import { AuthGuard } from "@/components/auth-guard"
// import { Header } from "@/components/header"
// import { Footer } from "@/components/footer"

// // interface ProtectedPageProps {
// //   children: React.ReactNode
// //   title?: string
// //   description?: string
// // }

// export function ProtectedPage({ children, title, description }: ProtectedPageProps) {
//   return (
//     <AuthGuard requireAuth={true} redirectTo="/auth/login">
//       <div className="min-h-screen bg-white">
//         <Header />
//         <main className="container mx-auto px-4 py-8">
//           {title && (
//             <div className="mb-8">
//               <h1 className="text-3xl font-bold text-stone-900 mb-2">{title}</h1>
//               {description && <p className="text-stone-600">{description}</p>}
//             </div>
//           )}
//           {children}
//         </main>
//         <Footer />
//       </div>
//     </AuthGuard>
//   )
// }

// export default ProtectedPage

"use client";

// import type React from "react"

import { AuthGuard } from "@/components/auth-guard";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

// interface ProtectedPageProps {
//   children: React.ReactNode
//   title?: string
//   description?: string
// }

export function ProtectedPage({ children, title, description }) {
  return (
    <AuthGuard requireAuth={true} redirectTo="/auth/login">
      <main className="container mx-auto px-4 py-8">
        {title && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-stone-900 mb-2">{title}</h1>
            {description && <p className="text-stone-600">{description}</p>}
          </div>
        )}
        {children}
      </main>
    </AuthGuard>
  );
}

export default ProtectedPage;
