import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-lg font-medium text-stone-800 mb-1 flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Terms & Conditions
        </h1>
        <p className="text-xs text-stone-600">
          Please read these terms carefully before using our website.
        </p>
      </div>

      <section className="space-y-6 text-xs text-stone-700">
        <div>
          <h2 className="text-sm font-semibold text-stone-800 mb-1">
            1. Overview
          </h2>
          <p>
            These Terms & Conditions govern your use of our website and
            services. By accessing or purchasing from Beautify Interior, you
            agree to comply with these terms.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-stone-800 mb-1">
            2. Eligibility
          </h2>
          <p>
            You must be at least 18 years old or have parental consent to make
            purchases on our site.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-stone-800 mb-1">
            3. Product Information
          </h2>
          <p>
            We strive to ensure all product details, images, and pricing are
            accurate. However, errors may occur and we reserve the right to
            correct them at any time without notice.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-stone-800 mb-1">
            4. Pricing & Payments
          </h2>
          <p>
            All prices are listed in INR (₹) unless otherwise stated. We accept
            payments via secure third-party gateways. We reserve the right to
            update pricing or cancel orders due to pricing errors or payment
            issues.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-stone-800 mb-1">
            5. Shipping & Delivery
          </h2>
          <p>
            Delivery times may vary by location. Estimated timeframes are listed
            on our <span className="underline">Shipping Policy</span> page.
            Delays may occur due to customs or unforeseen circumstances.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-stone-800 mb-1">
            6. Refunds & Returns
          </h2>
          <p>
            Refunds are issued only for defective or damaged items as outlined
            in our <span className="underline">Return Policy</span>. We do not
            offer general returns or exchanges unless the issue meets our policy
            criteria.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-stone-800 mb-1">
            7. Intellectual Property
          </h2>
          <p>
            All content including images, logos, and product designs on this
            website are the property of Beautify Interior and may not be copied
            or used without permission.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-stone-800 mb-1">
            8. Limitation of Liability
          </h2>
          <p>
            We are not liable for any direct, indirect, or incidental damages
            resulting from the use of our website or products beyond the
            purchase value.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-stone-800 mb-1">
            9. Changes to Terms
          </h2>
          <p>
            We reserve the right to update or modify these terms at any time.
            Continued use of the website implies acceptance of the updated
            terms.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-stone-800 mb-1">
            10. Contact
          </h2>
          <p>
            For any questions regarding these terms, contact us at{" "}
            <span className="font-medium text-stone-800">
              beautifyinterior@gmail.com
            </span>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
