import { ShieldCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-lg font-medium text-stone-800 mb-1 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5" />
          Privacy Policy
        </h1>
        <p className="text-xs text-stone-600">
          This Privacy Policy explains how we collect, use, and protect your
          personal information.
        </p>
      </div>

      <section className="space-y-6 text-xs text-stone-700">
        <div>
          <h2 className="text-sm font-semibold text-stone-800 mb-1">
            1. Information We Collect
          </h2>
          <p>We collect personal information when you:</p>
          <ul className="list-disc ml-5 mt-1 space-y-1">
            <li>Create an account or place an order</li>
            <li>Subscribe to our newsletter or promotions</li>
            <li>Contact us or fill out a form</li>
          </ul>
          <p className="mt-1">
            This includes your name, email, phone number, address, and payment
            information (handled securely via third-party providers).
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-stone-800 mb-1">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc ml-5 mt-1 space-y-1">
            <li>To process and deliver your orders</li>
            <li>To communicate order updates and support</li>
            <li>To improve user experience and website performance</li>
            <li>To send marketing emails (only if opted in)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-stone-800 mb-1">
            3. Sharing Your Information
          </h2>
          <p>
            We do not sell or rent your personal data. Your information may be
            shared only with:
          </p>
          <ul className="list-disc ml-5 mt-1 space-y-1">
            <li>Payment gateways (e.g., Razorpay, Stripe)</li>
            <li>Shipping partners (to deliver your order)</li>
            <li>Analytics or marketing tools (like Google Analytics)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-stone-800 mb-1">
            4. Cookies & Tracking
          </h2>
          <p>
            We use cookies to improve site functionality, personalize your
            experience, and analyze site traffic. You can manage cookie
            preferences in your browser settings.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-stone-800 mb-1">
            5. Data Security
          </h2>
          <p>
            We use secure servers and encryption protocols to protect your data.
            Sensitive payment information is never stored on our servers.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-stone-800 mb-1">
            6. Your Rights
          </h2>
          <p>
            You can request access to, correction of, or deletion of your
            personal information by contacting us at:
            <span className="font-medium text-stone-800">
              {" "}
              beautifyinterior@gmail.com
            </span>
            .
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-stone-800 mb-1">
            7. Policy Updates
          </h2>
          <p>
            We may update this policy from time to time. Last updated:{" "}
            <span className="font-medium">June 22, 2025</span>.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-stone-800 mb-1">
            8. Contact Us
          </h2>
          <p>
            For any privacy-related concerns, reach out to us at:
            <span className="font-medium text-stone-800">
              {" "}
              beautifyinterior@gmail.com
            </span>
          </p>
        </div>
      </section>
    </main>
  );
}
