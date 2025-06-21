import { Cookie } from "lucide-react";

export default function CookiesPolicyPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-lg font-medium text-stone-800 mb-1 flex items-center gap-2">
          <Cookie className="h-5 w-5" />
          Cookies Policy
        </h1>
        <p className="text-xs text-stone-600">
          This policy explains how we use cookies and similar technologies on
          our website.
        </p>
      </div>

      <section className="space-y-6 text-xs text-stone-700">
        <div>
          <h2 className="text-sm font-semibold text-stone-800 mb-1">
            1. What Are Cookies?
          </h2>
          <p>
            Cookies are small text files that are stored on your device when you
            visit our website. They help us recognize your browser and remember
            preferences for future visits.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-stone-800 mb-1">
            2. Types of Cookies We Use
          </h2>
          <ul className="list-disc ml-5 mt-1 space-y-1">
            <li>
              <span className="font-medium">Essential Cookies:</span> Required
              for basic functionality like cart and checkout.
            </li>
            <li>
              <span className="font-medium">Analytics Cookies:</span> Help us
              understand how users interact with our site (e.g., Google
              Analytics).
            </li>
            <li>
              <span className="font-medium">Preference Cookies:</span> Remember
              your location, language, or display settings.
            </li>
            <li>
              <span className="font-medium">Marketing Cookies:</span> Used by
              advertising partners to display relevant ads (only if consented).
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-stone-800 mb-1">
            3. Managing Cookies
          </h2>
          <p>
            You can control and delete cookies through your browser settings.
            Most browsers allow you to block or delete cookies entirely.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-stone-800 mb-1">
            4. Third-Party Cookies
          </h2>
          <p>
            We may allow third-party services such as payment gateways or
            analytics platforms to set cookies on your browser for functionality
            or measurement purposes.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-stone-800 mb-1">
            5. Consent
          </h2>
          <p>
            By continuing to use our site, you consent to the use of cookies in
            accordance with this policy. You may withdraw consent at any time by
            clearing cookies or adjusting settings.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-stone-800 mb-1">
            6. Updates to This Policy
          </h2>
          <p>
            We may update this policy periodically. Changes will be reflected on
            this page with a revised "Last updated" date.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-stone-800 mb-1">
            7. Contact
          </h2>
          <p>
            For questions or concerns regarding this Cookies Policy, please
            contact us at{" "}
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
